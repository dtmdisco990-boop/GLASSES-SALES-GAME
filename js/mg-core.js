/* Frame Margin — side-task framework: alarm, briefing, countdown, win/fail stamp */
(function () {
  'use strict';
  var FM = window.FM, U = FM.util, $ = U.$, el = U.el;
  var MG = FM.mg = { defs: {}, active: null, history: [] };

  /* def: { title, brief(d, tutorial) -> html, time(d) -> seconds (omit for no countdown), timeout, build(ctx) } */
  MG.register = function (id, def) { def.id = id; MG.defs[id] = def; };

  /* opts: { d: 0..1 difficulty, tutorial: bool }  ->  Promise({ success, reason }) */
  MG.run = function (id, opts) {
    opts = opts || {};
    var def = MG.defs[id], d = U.clamp(opts.d || 0, 0, 1);
    return new Promise(function (resolve) {
      var ov = $('#overlay-mg'), panel = $('.mg-panel', ov);
      var brief = $('#mg-brief'), body = $('#mg-body'), status = $('#mg-status'), stamp = $('#mg-stamp');
      var timerBox = $('#mg-timer'), fill = $('#mg-timer-fill'), num = $('#mg-timer-num');
      var total = def.time ? def.time(d) * (opts.tutorial ? 2.5 : 1) : 0, left = total;
      var hotAt = total ? Math.min(5, total * 0.3) : 0;
      var raf = 0, last = 0, lastUrgentSec = 0, running = false, done = false, cleanups = [], go, ctx;

      function clearPanelState() {
        if (!panel) return;
        panel.classList.remove('hit', 'urgent', 'mg-win', 'mg-fail', 'pulse-good', 'pulse-bad');
      }

      function triggerAnim(node, cls) {
        if (!node) return;
        node.classList.remove(cls);
        void node.offsetWidth;
        node.classList.add(cls);
      }

      function spawnPenaltyPop(sec) {
        if (!timerBox || !timerBox.parentNode) return;
        var pop = el('span', { 'class': 'mg-pen-pop', text: '−' + sec + 's', 'aria-hidden': 'true' });
        timerBox.parentNode.appendChild(pop);
        setTimeout(function () { if (pop.parentNode) pop.parentNode.removeChild(pop); }, 760);
      }

      function draw() {
        var hot, secNow;
        if (!total) return;
        fill.style.transform = 'scaleX(' + U.clamp(left / total, 0, 1).toFixed(4) + ')';
        num.textContent = left.toFixed(1) + 's';
        hot = left > 0 && left <= hotAt;
        timerBox.classList.toggle('hot', hot);
        if (panel) panel.classList.toggle('urgent', hot && running && !done);
        if (hot && running && !done) {
          secNow = Math.ceil(left);
          if (secNow > 0 && secNow !== lastUrgentSec) {
            lastUrgentSec = secNow;
            FM.audio.play('urgentTick');
            triggerAnim(timerBox, 'tick-pop');
          }
        }
      }

      function finish(success, msg) {
        if (done) return;
        done = true;
        running = false;
        ctx.phase = 'done';
        cancelAnimationFrame(raf);
        document.removeEventListener('visibilitychange', onVisibility);
        cleanups.forEach(function (fn) { try { fn(); } catch (e) { /* ignore */ } });
        body.style.pointerEvents = 'none';
        clearPanelState();
        if (panel) panel.classList.add(success ? 'mg-win' : 'mg-fail');
        status.textContent = msg;
        status.className = 'mg-status ' + (success ? 'good' : 'bad');
        triggerAnim(status, 'pop');
        stamp.textContent = success ? 'HANDLED' : 'FAILED';
        stamp.className = 'mg-stamp ' + (success ? 'ok' : 'no');
        stamp.hidden = false;
        FM.audio.play(success ? 'ok' : 'fail');
        MG.history.push({ id: id, success: success, reason: msg });
        setTimeout(function () {
          ov.classList.remove('show');
          setTimeout(function () {
            ov.hidden = true;
            body.innerHTML = '';
            stamp.hidden = true;
            clearPanelState();
            MG.active = null;
            resolve({ success: success, reason: msg });
          }, 230);
        }, success ? 1000 : 1500);
      }

      /* real elapsed time per frame; time with the tab hidden is not counted */
      function onVisibility() { last = 0; }
      function tick(now) {
        var dt = last && !document.hidden ? Math.min(1, (now - last) / 1000) : 0;
        last = now;
        if (done) return;
        if (running && total) {
          left -= dt;
          if (left <= 0) { left = 0; draw(); finish(false, def.timeout || 'Time ran out.'); return; }
          draw();
        }
        raf = requestAnimationFrame(tick);
      }

      function begin() {
        if (running || done) return;
        FM.audio.play('click');
        brief.hidden = true;
        body.hidden = false;
        ctx.phase = 'play';
        running = true;
        last = 0;
        lastUrgentSec = 0;
        try {
          def.build(ctx);
        } catch (e) {
          if (window.console) console.error(e);
          finish(false, 'Side-task error: ' + e.message);
          return;
        }
        document.addEventListener('visibilitychange', onVisibility);
        raf = requestAnimationFrame(tick);
      }

      ctx = MG.active = {
        id: id, def: def, d: d, root: body, tutorial: !!opts.tutorial, state: {}, phase: 'brief', mistakes: 0,
        live: function () { return running && !done; },
        timeLeft: function () { return left; },
        status: function (msg, cls) {
          status.textContent = msg || '';
          status.className = 'mg-status ' + (cls || '');
          if (msg) triggerAnim(status, 'pop');
        },
        pulse: function (kind) {
          if (!panel || done) return;
          panel.classList.remove('pulse-good', 'pulse-bad');
          triggerAnim(panel, kind === 'bad' ? 'pulse-bad' : 'pulse-good');
        },
        penalty: function (sec, msg, optsPen) {
          if (done) return;
          ctx.mistakes++;
          FM.audio.play((optsPen && optsPen.sfx) || 'err');
          status.textContent = (msg || 'Mistake') + (total ? '  (−' + sec + 's)' : '');
          status.className = 'mg-status bad';
          triggerAnim(status, 'pop');
          triggerAnim(panel, 'hit');
          if (!total) return;
          left = Math.max(0, left - sec);
          triggerAnim(timerBox, 'hit');
          spawnPenaltyPop(sec);
          draw();
          if (left <= 0) finish(false, def.timeout || 'Time ran out.');
        },
        onCleanup: function (fn) { cleanups.push(fn); },
        win: function (msg) { finish(true, msg || 'Handled.'); },
        fail: function (msg) { finish(false, msg || 'Failed.'); },
        start: begin
      };

      clearPanelState();
      $('#mg-title').textContent = def.title;
      body.innerHTML = '';
      body.hidden = true;
      body.style.pointerEvents = '';
      status.textContent = '';
      status.className = 'mg-status';
      stamp.hidden = true;
      timerBox.className = 'mg-timer';
      timerBox.style.visibility = total ? 'visible' : 'hidden';
      fill.style.transform = 'scaleX(1)';
      num.textContent = total ? total.toFixed(1) + 's' : '';
      brief.hidden = false;
      brief.innerHTML = def.brief(d, !!opts.tutorial);
      go = el('button', { type: 'button', 'class': 'btn btn-primary mg-go', text: 'START' });
      go.addEventListener('click', begin);
      brief.appendChild(go);

      ov.hidden = false;
      void ov.offsetWidth;
      ov.classList.add('show');
      FM.audio.play('alarm');
      go.focus();
    });
  };
})();
