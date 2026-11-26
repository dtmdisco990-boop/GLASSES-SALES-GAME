/* Frame Margin — the eBay Messages negotiation engine (branching + subtle tonal traps) */
(function () {
  'use strict';
  var FM = window.FM, U = FM.util, $ = U.$, el = U.el, wait = U.wait;
  var C = FM.chat = { state: null };

  var REACT = {
    b: ["Hmph.", "...fine. But I'm not done.", "You sellers and your policies.", "Whatever. Next thing."],
    g: ["That's a start.", "Should have led with that.", "OK. Keep going."],
    w: ["That is NOT an answer.", "Are you even reading my messages?", "Unbelievable. Useless.", "Wow. Great customer service."],
    t: ["EXCUSE ME?!", "Did you seriously just say that to a customer?", "Screenshotting this for eBay.", "WOW. Just wow."]
  };

  function log() { return $('#chat-log'); }
  function scroll() { var l = log(); l.scrollTop = l.scrollHeight; }
  /* keep the newest message in view whenever the log is resized (e.g. the reply options appear on a phone) */
  if (window.ResizeObserver) new ResizeObserver(scroll).observe(log());
  window.addEventListener('resize', scroll);
  function bubble(cls, text) {
    var b = el('div', { 'class': 'msg ' + cls, text: text });
    log().appendChild(b);
    scroll();
    return b;
  }
  function sys(text, cls) { return bubble('sys ' + (cls || ''), text); }
  function idle(text) {
    var box = $('#reply-options');
    box.innerHTML = '';
    box.appendChild(el('div', { 'class': 'reply-idle', text: text }));
  }
  function bump(sel) {
    var c = $(sel).parentNode;
    c.classList.remove('bump');
    void c.offsetWidth;
    c.classList.add('bump');
  }

  function drawHud(S) {
    var cfg = S.cfg, m = FM.calc.margin(S.givenC);
    var room = Math.max(0, FM.calc.headroomC(cfg) - S.givenC), chip = $('.chip-margin');
    $('#hud-given').textContent = U.money(S.givenC / 100);
    $('#hud-margin').textContent = U.pct(m);
    $('#hud-floor').textContent = '(floor ' + U.pct(cfg.floor) + (cfg.strict ? ' strict' : '') + ')';
    $('#hud-room').textContent = U.money(room / 100);
    chip.classList.toggle('danger', room < 200);
    chip.classList.toggle('warn', room >= 200 && room < 800);
    $('#meter-fill').style.width = U.clamp(m / 34 * 100, 0, 100) + '%';
    $('#meter-floor').style.left = U.clamp(cfg.floor / 34 * 100, 0, 100) + '%';
    $('#hud-round').textContent = 'Round ' + Math.min(S.round + 1, cfg.rounds.length) + ' / ' + cfg.rounds.length;
  }

  function drawBars(S) {
    var cfg = S.cfg, p = U.clamp(S.patience, 0, 100), bar = $('#patience-bar'), t = $('#timer');
    var frac = S.awaiting ? U.clamp(S.remaining / cfg.timer, 0, 1) : 1;
    $('#patience-fill').style.transform = 'scaleX(' + (p / 100).toFixed(4) + ')';
    bar.classList.toggle('low', p < 25);
    bar.classList.toggle('mid', p >= 25 && p < 55);
    $('#timer-fill').style.transform = 'scaleX(' + frac.toFixed(4) + ')';
    $('#timer-num').textContent = S.awaiting ? S.remaining.toFixed(1) + 's' : '';
    t.classList.toggle('live', !!S.awaiting);
    t.classList.toggle('hot', !!S.awaiting && S.remaining <= Math.min(3, cfg.timer * 0.5));
  }

  /* resolve the buyer's prompts for round R based on the previous round's pick kind */
  function roundMessages(R, prevKind) {
    if (R.branch && prevKind && Array.isArray(R.branch[prevKind]) && R.branch[prevKind].length) {
      return R.branch[prevKind];
    }
    return R.m;
  }

  /* fill in the monitor and clear any leftover animation classes before it slides up */
  C.prepare = function (cfg) {
    var av = $('#c-avatar'), bar = $('#patience-bar'), timer = $('#timer');
    var S = { cfg: cfg, round: 0, givenC: 0, patience: cfg.patienceStart, remaining: cfg.timer, awaiting: false };
    log().innerHTML = '';
    bar.classList.remove('hit', 'low', 'mid');
    timer.classList.remove('live', 'hot');
    U.$$('.chip').forEach(function (c) { c.classList.remove('bump', 'warn', 'danger'); });
    av.textContent = cfg.user.charAt(0);
    av.style.background = cfg.color || '#888';
    $('#c-name').textContent = cfg.user;
    $('#c-meta').textContent = '(' + cfg.fb + ')  ·  ' + cfg.item;
    $('#hud-paid').textContent = U.money(FM.PAID_C / 100);
    $('#hud-cost').textContent = U.money(FM.COST_C / 100);
    drawHud(S);
    drawBars(S);
    idle('Waiting for the buyer...');
  };

  /* opts: { onRound(i) -> promise (tutorial pause), noTasks }
     resolves { win, why, title, text, stats } — why is win | time | patience | margin | task */
  C.run = function (cfg, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var S = C.state = {
        cfg: cfg, round: 0, givenC: 0, patience: cfg.patienceStart, remaining: cfg.timer,
        awaiting: false, paused: false, over: false,
        lastTrigger: null, lastTrap: null, lastWeak: null,
        mistakes: 0, gaveCount: 0, trapsHit: 0, lastKind: null,
        options: [], picks: [], branches: [], tickAt: 0
      };
      var raf = 0, last = 0, askResolve = null;

      /* time spent with the tab hidden is never charged to the player */
      function onVisibility() { last = 0; }

      function end(win, why, detail) {
        if (S.over) return;
        S.over = true;
        S.awaiting = false;
        cancelAnimationFrame(raf);
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('visibilitychange', onVisibility);
        idle(win ? 'Conversation closed.' : 'Conversation lost.');
        drawBars(S);
        var m = FM.calc.margin(S.givenC), given = U.money(S.givenC / 100), title, text, r;
        if (win) {
          title = 'Sale saved'; text = cfg.user + ' kept the frames.';
        } else if (why === 'time') {
          title = 'Out of time';
          text = 'You took longer than ' + U.secs(cfg.timer) + ' to reply, so ' + cfg.user + ' opened a case.';
        } else if (why === 'patience') {
          title = 'Customer patience ran out';
          if (S.lastTrap) {
            text = S.lastTrap.label + ': ' + S.lastTrap.why + '. ' + cfg.user + ' escalated and filed a return.';
          } else if (S.lastWeak) {
            text = 'Weak reply (' + S.lastWeak + ') was the last straw. ' + cfg.user + ' left and filed a return.';
          } else if (S.lastTrigger) {
            text = 'Saying "' + S.lastTrigger + '" was the last straw. ' + cfg.user + ' left and filed a return.';
          } else {
            text = cfg.user + ' ran out of patience and filed a return.';
          }
        } else if (why === 'margin') {
          title = 'Margin floor broken';
          text = cfg.strict ? 'You gave away ' + given + '. The ' + U.pct(cfg.floor) + ' floor is strict here: giving away even $0.01 loses.'
            : 'You gave away ' + given + ', so margin fell to ' + U.pct(m) + ' — below the ' + U.pct(cfg.floor) + ' floor.';
        } else if (why === 'task') {
          title = 'Store emergency failed'; text = detail || 'The side-task went wrong.';
        } else {
          title = 'Something went wrong'; text = detail || '';
        }
        if (askResolve) { r = askResolve; askResolve = null; r(null); }
        resolve({
          win: !!win, why: why, title: title, text: text,
          stats: { margin: m, given: S.givenC / 100, patience: Math.max(0, Math.round(S.patience)), floor: cfg.floor, strict: !!cfg.strict, replies: S.picks.length }
        });
      }

      /* real elapsed time per frame, so a slow frame rate cannot stretch the reply timer */
      function loop(now) {
        var dt = last && !document.hidden ? Math.min(1, (now - last) / 1000) : 0;
        last = now;
        if (S.over) return;
        if (S.awaiting && !S.paused) {
          S.remaining -= dt;
          S.patience -= cfg.drain * dt;
          if (S.remaining <= Math.min(3, cfg.timer * 0.5) && now - S.tickAt > 480) { S.tickAt = now; FM.audio.play('tick'); }
          if (S.patience <= 0) { S.patience = 0; end(false, 'patience'); return; }
          if (S.remaining <= 0) { S.remaining = 0; end(false, 'time'); return; }
          drawBars(S);
        }
        raf = requestAnimationFrame(loop);
      }

      function choose(i) {
        var o = S.options[i], r = askResolve;
        if (!S.awaiting || S.paused || S.over || !o || !r) return;
        S.awaiting = false;
        askResolve = null;
        idle('...');
        drawBars(S);
        r(o);
      }
      S.pick = choose;

      function onKey(e) {
        var n;
        if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || !S.awaiting || S.paused) return;
        if (!$('#overlay-modal').hidden || !$('#overlay-mg').hidden || !$('#coach').hidden) return;
        n = parseInt(e.key, 10);
        if (n >= 1 && n <= S.options.length) { e.preventDefault(); choose(n - 1); }
      }

      function ask(R) {
        return new Promise(function (res) {
          var box = $('#reply-options');
          askResolve = res;
          S.lastTrigger = null;
          S.lastTrap = null;
          S.lastWeak = null;
          S.options = U.shuffle(R.o).map(FM.normalizeOpt);
          box.innerHTML = '';
          S.options.forEach(function (o, i) {
            var b = el('button', { type: 'button', 'class': 'opt' }, [el('kbd', { text: String(i + 1) }), el('span', { text: o.text })]);
            b.style.animationDelay = (i * 35) + 'ms';
            b.addEventListener('click', function () { choose(i); });
            box.appendChild(b);
          });
          S.remaining = cfg.timer;
          S.awaiting = true;
          last = 0;                 // the reply clock starts on the next frame
          drawBars(S);
          scroll();                 // the reply zone just grew: keep the buyer's newest demand visible
        });
      }

      function hurt(n) {
        var bar = $('#patience-bar');
        S.patience = Math.max(0, S.patience - n);
        bar.classList.remove('hit');
        void bar.offsetWidth;
        bar.classList.add('hit');
      }

      /* scores a reply; returns { kind, fatal } where fatal is null | 'margin' | 'patience' */
      function apply(o) {
        var trig = FM.findTrigger(o.text), kind = (o.kind === 't' || trig) ? 't' : o.kind;
        var before = S.patience, pen, loss, label, why;
        bubble('me', o.text);
        FM.audio.play('msgOut');
        if (kind === 't') {
          pen = (70 + S.mistakes * 36 + S.gaveCount * 36) * cfg.mult;
          S.mistakes++;
          S.trapsHit++;
          hurt(pen);
          loss = Math.round(before - S.patience);
          label = o.trap || (trig ? 'Trigger "' + trig + '"' : 'Tonal trap');
          why = o.why || (trig ? '"' + trig + '" escalates buyer conflict' : 'Escalating phrasing risks an INAD case');
          S.lastTrigger = trig || label;
          S.lastTrap = { label: label, why: why };
          sys(label + ' — ' + why + ' (−' + loss + ' patience)', 'bad');
          FM.audio.play('trigger');
        } else if (kind === 'b') {
          S.patience = Math.min(100, S.patience + 6);
          FM.audio.play('good');
        } else if (kind === 'g') {
          S.givenC += Math.round(o.give * 100);
          S.gaveCount++;
          if (S.mistakes === 0) {
            S.patience = Math.min(100, S.patience + 4);
            sys('Concession: gave ' + U.money(o.give) + ' (total ' + U.money(S.givenC / 100) + ') — ' + (o.why || 'buyer sees room to push'), 'warn');
          } else {
            hurt(30 * cfg.mult);
            loss = Math.round(before - S.patience);
            S.lastWeak = 'throwing a refund after a bad reply looked like hush money';
            sys('Hush-money backfire: gave ' + U.money(o.give) + ' after a bad reply (−' + loss + ' patience)', 'bad');
          }
          FM.audio.play('give');
          bump('#hud-given');
        } else {
          pen = (46 + S.mistakes * 36 + S.gaveCount * 36) * cfg.mult;
          S.mistakes++;
          hurt(pen);
          loss = Math.round(before - S.patience);
          why = o.why || 'vague reply invites a harder push';
          S.lastWeak = why;
          sys('Weak reply — ' + why + ' (−' + loss + ' patience)', 'bad');
          FM.audio.play('hurt');
        }
        S.picks.push({ round: S.round, kind: kind, trigger: trig, trap: o.trap || null, why: o.why || null, give: o.give });
        drawHud(S);
        drawBars(S);
        if (FM.calc.breaks(S.givenC, cfg)) return { kind: kind, fatal: 'margin' };
        if (S.patience <= 0) { S.patience = 0; drawBars(S); return { kind: kind, fatal: 'patience' }; }
        return { kind: kind, fatal: null };
      }

      async function customerSays(text, quick) {
        var t = bubble('them typing', ''), ms;
        t.innerHTML = '<i></i><i></i><i></i>';
        ms = quick ? 380 : U.clamp(460 + text.length * 6, 560, 1100) * (1 - 0.45 * cfg.d);
        await wait(ms);
        if (S.over) { t.remove(); return; }
        t.className = 'msg them';
        t.textContent = text;
        FM.audio.play('msgIn');
        scroll();
      }

      async function play() {
        var i, j, R, msgs, o, outcome, react, task, res, closing;
        await wait(300);
        for (i = 0; i < cfg.rounds.length; i++) {
          S.round = i;
          drawHud(S);
          R = cfg.rounds[i];
          msgs = roundMessages(R, S.lastKind);
          S.branches.push({ round: i, fromKind: S.lastKind || 'start', messages: msgs });
          for (j = 0; j < msgs.length; j++) await customerSays(msgs[j], j > 0);
          if (opts.onRound) { S.paused = true; await opts.onRound(i); S.paused = false; }
          o = await ask(R);
          if (!o || S.over) return;
          outcome = apply(o);
          if (S.over) return;
          if (outcome.fatal === 'margin') { end(false, 'margin'); return; }
          react = o.reply || U.pick(REACT[outcome.kind]);
          if (outcome.fatal === 'patience') {
            await customerSays(react, true);
            await wait(160);
            end(false, 'patience');
            return;
          }
          S.lastKind = outcome.kind;
          await customerSays(react, true);
          if (i === cfg.rounds.length - 1) break;
          task = opts.noTasks ? null : (cfg.tasks || []).filter(function (t) { return t.after === i + 1; })[0];
          if (task) {
            sys('STORE EMERGENCY — ' + FM.mg.defs[task.id].title, 'alarm');
            await wait(700);
            res = await FM.mg.run(task.id, { d: cfg.d });
            if (!res.success) { end(false, 'task', res.reason); return; }
            sys('Emergency handled. Back to the buyer.', 'ok');
            await wait(350);
          }
        }
        closing = (S.givenC > 0 && cfg.closeBranch && cfg.closeBranch.gave) ? cfg.closeBranch.gave
          : (S.mistakes > 0 && cfg.closeBranch && cfg.closeBranch.tense) ? cfg.closeBranch.tense
          : cfg.close;
        await customerSays(closing, false);
        sys('Case closed — sale saved.', 'ok');
        await wait(750);
        end(true, 'win');
      }

      document.addEventListener('keydown', onKey);
      document.addEventListener('visibilitychange', onVisibility);
      drawHud(S);
      drawBars(S);
      raf = requestAnimationFrame(loop);
      play().catch(function (err) {
        if (window.console) console.error(err);
        end(false, 'error', String((err && err.message) || err));
      });
    });
  };
})();
