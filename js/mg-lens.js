/* Side-task 3 — Wrong Prescription Lens Tray
   Hold pickup -> Quarantine wrong tray -> Pick tray matching Order ID, OD and OS codes -> Release verified tray */
(function () {
  'use strict';
  var FM = window.FM, U = FM.util, el = U.el;

  function rx() {
    var sph = (U.randInt(2, 22) * 0.25).toFixed(2), cyl = (U.randInt(1, 6) * 0.25).toFixed(2);
    var axis = ('00' + (U.randInt(1, 18) * 10)).slice(-3);
    return '-' + sph + ' -' + cyl + ' x' + axis;
  }
  function otherRx(avoid) {
    var r, guard = 0;
    do { r = rx(); guard++; } while (avoid.indexOf(r) !== -1 && guard < 50);
    return r;
  }
  function trayLines(t) {
    return [el('b', { text: 'Order ' + t.order }), el('span', { text: 'OD ' + t.od }), el('span', { text: 'OS ' + t.os })];
  }

  FM.mg.register('lens', {
    title: 'Wrong Prescription Lens Tray',
    time: function (d) { return U.lerp(30, 15, d); },
    timeout: 'Too slow - the wrong lenses left with the customer.',
    brief: function () {
      return '<p>The lab staged the <b>wrong lens tray</b> at the pickup desk. Fix it in order before the timer runs out:</p>' +
        '<ol class="mg-steps"><li>Hold pickup</li><li>Quarantine wrong tray</li><li>Pick the tray matching Order ID, OD and OS</li><li>Release verified tray</li></ol>' +
        '<p>OD = right eye, OS = left eye. All three codes must match the work ticket. Releasing the wrong tray fails the job.</p>';
    },
    build: function (ctx) {
      var order = 'LT-' + U.digits(5), od = rx(), os = otherRx([od]);
      var good = { order: order, od: od, os: os, ok: true };
      var trays = U.shuffle([
        good,
        { order: order, od: os, os: od },                               // right order, eyes swapped
        { order: U.nearMiss(order), od: od, os: os },                   // right lenses, wrong order
        { order: order, od: od, os: otherRx([od, os]) },                // right order, wrong left lens
        { order: U.nearMiss(order), od: otherRx([od, os]), os: os }     // wrong order, wrong right lens
      ]);
      var staged = { order: U.nearMiss(order), od: otherRx([od, os]), os: otherRx([od, os]) };
      var st = ctx.state = { step: 0, selected: -1, correctIndex: trays.indexOf(good), ticket: good, trays: trays };

      var stepBar = el('ol', { 'class': 'lt-steps', 'aria-hidden': 'true' }, [
        el('li', { 'class': 'now', text: '1 Hold' }),
        el('li', { text: '2 Quarantine' }),
        el('li', { text: '3 Match Rx' }),
        el('li', { text: '4 Release' })
      ]);
      var light = el('span', { 'class': 'lt-light', text: 'READY FOR PICKUP' });
      var slot = el('div', { 'class': 'lt-slot', text: 'Order ' + staged.order });
      var desk = el('div', { 'class': 'lt-desk' }, [el('small', { text: 'Pickup desk' }), light, slot]);
      var binNote = el('b', { text: 'Order ' + staged.order });
      var bin = el('div', { 'class': 'lt-bin' }, [el('small', { text: 'Quarantine bin' }), binNote]);
      var shelf = el('div', { 'class': 'lt-shelf' }), actions = el('div', { 'class': 'lt-actions' });
      var trayEls = [], actBtns = {};

      function shake(node) {
        node.classList.remove('wrong');
        void node.offsetWidth;
        node.classList.add('wrong');
      }

      function syncSteps(doneCount) {
        var i;
        for (i = 0; i < stepBar.children.length; i++) {
          stepBar.children[i].classList.toggle('on', i < doneCount);
          stepBar.children[i].classList.toggle('now', i === doneCount);
        }
      }

      function act(name, btn) {
        if (!ctx.live()) return;
        if (name === 'hold') {
          if (st.step !== 0) return;
          st.step = 1;
          desk.classList.add('hold');
          light.textContent = 'ON HOLD';
          btn.classList.add('done');
          btn.disabled = true;
          syncSteps(1);
          FM.audio.play('holdOn');
          ctx.pulse('good');
          ctx.status('Pickup on hold. Now quarantine the wrong tray.', 'good');
        } else if (name === 'quarantine') {
          if (st.step === 0) { shake(btn); ctx.penalty(2.5, 'Hold the pickup first'); return; }
          if (st.step !== 1) return;
          st.step = 2;
          slot.classList.add('gone');
          bin.classList.add('full', 'catch-pop');
          shelf.classList.add('unlocked');
          btn.classList.add('done');
          btn.disabled = true;
          syncSteps(2);
          FM.audio.play('quarantine');
          ctx.pulse('good');
          ctx.status('Wrong tray quarantined. Pick the tray matching Order, OD & OS.', 'good');
        } else if (name === 'release') {
          if (st.step < 2) { shake(btn); ctx.penalty(2.5, st.step === 0 ? 'Hold the pickup first' : 'Quarantine the wrong tray first'); return; }
          if (st.selected < 0) { shake(btn); ctx.penalty(1.5, 'Pick a tray to verify first'); return; }
          if (st.selected === st.correctIndex) {
            desk.classList.remove('hold');
            desk.classList.add('verified');
            light.textContent = 'VERIFIED - RELEASED';
            slot.textContent = 'Order ' + order;
            slot.className = 'lt-slot in';
            trayEls[st.selected].classList.add('verified');
            btn.classList.add('done');
            btn.classList.remove('ready');
            syncSteps(4);
            FM.audio.play('verifyOk');
            ctx.pulse('good');
            ctx.win('Verified tray released. Order, OD and OS all match.');
          } else {
            shake(trayEls[st.selected]);
            trayEls[st.selected].classList.add('bad-pick');
            trayEls[st.correctIndex].classList.add('reveal-ok');
            ctx.fail('Wrong tray released - it does not match the ticket on Order ID, OD and OS.');
          }
        }
      }

      function pick(i) {
        if (!ctx.live()) return;
        if (st.step < 2) {
          shake(trayEls[i]);
          ctx.penalty(2.5, st.step === 0 ? 'Hold the pickup first' : 'Quarantine the wrong tray first');
          return;
        }
        st.selected = i;
        trayEls.forEach(function (t, j) {
          t.classList.toggle('sel', j === i);
          t.setAttribute('aria-pressed', j === i ? 'true' : 'false');
        });
        trayEls[i].classList.remove('pop');
        void trayEls[i].offsetWidth;
        trayEls[i].classList.add('pop');
        syncSteps(3);
        if (actBtns.release) actBtns.release.classList.add('ready');
        FM.audio.play('lensPop');
        ctx.status('Tray selected. Double-check Order, OD and OS, then release it.');
      }

      trays.forEach(function (t, i) {
        var b = el('button', { type: 'button', 'class': 'lt-tray', 'aria-pressed': 'false', 'data-i': i }, trayLines(t));
        b.addEventListener('click', function () { pick(i); });
        trayEls.push(b);
        shelf.appendChild(b);
      });
      U.shuffle([['hold', 'Hold pickup'], ['quarantine', 'Quarantine wrong tray'], ['release', 'Release verified tray']]).forEach(function (a) {
        var b = el('button', { type: 'button', 'class': 'mg-btn', 'data-act': a[0], text: a[1] });
        b.addEventListener('click', function () { act(a[0], b); });
        actBtns[a[0]] = b;
        actions.appendChild(b);
      });

      ctx.root.appendChild(el('div', { 'class': 'lt-wrap' }, [
        stepBar,
        el('div', { 'class': 'lt-top' }, [
          el('div', { 'class': 'lt-ticket' }, [el('small', { text: 'Work ticket' })].concat(trayLines(good))),
          desk,
          bin
        ]),
        shelf,
        actions
      ]));
      ctx.status('A wrong tray is sitting at the pickup desk.');
    }
  });
})();
