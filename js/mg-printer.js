/* Side-task 2 — Label Printer Jam
   Exact order: Open lid -> Remove jammed label -> Reseat roll -> Close lid -> Test feed -> Pick matching Order ID */
(function () {
  'use strict';
  var FM = window.FM, U = FM.util, el = U.el;

  var STEPS = [
    ['open', 'Open lid', 'open', 'lid', 'Lid open. Now pull the jammed label.'],
    ['remove', 'Remove jammed label', 'cleared', 'rip', 'Jammed label removed. Reseat the roll.'],
    ['reseat', 'Reseat roll', 'seated', 'roll', 'Roll seated cleanly. Close the lid.'],
    ['close', 'Close lid', '', 'lidClose', 'Lid latched shut. Run a test feed.'],
    ['feed', 'Test feed', 'printed', 'feed', 'Test label printed! Now match the Order ID.']
  ];

  FM.mg.register('printer', {
    title: 'Label Printer Jam',
    STEPS: STEPS.map(function (s) { return s[0]; }),
    time: function (d) { return U.lerp(26, 13, d); },
    timeout: 'Too slow - the courier left before the label printed.',
    brief: function () {
      return '<p>The label printer jammed mid-order. Clear it in this <b>exact order</b> before the timer runs out:</p>' +
        '<ol class="mg-steps"><li>Open lid</li><li>Remove jammed label</li><li>Reseat roll</li><li>Close lid</li><li>Test feed</li><li>Pick matching Order ID</li></ol>' +
        '<p>A step out of order costs time. The wrong Order ID fails the job.</p>';
    },
    build: function (ctx) {
      var order = U.orderId(), ids = [order], n, guard = 0, idPicked = false;
      var st = ctx.state = { order: order, step: 0, sequence: STEPS.map(function (s) { return s[0]; }) };
      var out = el('div', { 'class': 'pj-out', text: 'TEST OK' });
      var printer = el('div', { 'class': 'pj-printer jammed' }, [
        el('div', { 'class': 'pj-bay' }, [el('div', { 'class': 'pj-roll' }), el('div', { 'class': 'pj-jam' })]),
        el('div', { 'class': 'pj-body' }, [el('div', { 'class': 'pj-led' }), el('div', { 'class': 'pj-slot' }, el('i', { 'class': 'pj-beam' }))]),
        el('div', { 'class': 'pj-lid' }),
        out
      ]);
      var track = el('ol', { 'class': 'pj-track', 'aria-hidden': 'true' }, [0, 1, 2, 3, 4, 5].map(function (i) {
        return el('li', { 'class': i === 0 ? 'now' : '' });
      }));
      var promptSteps = el('div', { 'class': 'pj-prompt', text: 'Step 1 of 6 — clear the jam in order:' });
      var actions = el('div', { 'class': 'pj-actions' }, promptSteps);
      var idBox = el('div', { 'class': 'pj-ids', hidden: true }, el('div', { 'class': 'pj-prompt', text: 'Step 6 of 6 — pick the Order ID matching the slip:' }));
      var idBtns = [];

      while (ids.length < 4 && guard++ < 80) {
        n = U.nearMiss(order);
        if (ids.indexOf(n) === -1) ids.push(n);
      }
      st.ids = U.shuffle(ids);

      function shake(btn) {
        btn.classList.remove('wrong');
        void btn.offsetWidth;
        btn.classList.add('wrong');
      }

      function syncTrack() {
        var i;
        for (i = 0; i < track.children.length; i++) {
          track.children[i].classList.toggle('on', i < st.step);
          track.children[i].classList.toggle('now', i === st.step);
        }
      }

      function act(name, btn) {
        var s = STEPS[st.step];
        if (!ctx.live() || btn.disabled) return;
        if (!s || name !== s[0]) {
          shake(btn);
          ctx.penalty(2.5, 'Out of order - that is not step ' + (st.step + 1));
          return;
        }
        btn.classList.add('done');
        btn.disabled = true;
        st.step++;
        syncTrack();
        if (name === 'remove') printer.classList.remove('jammed');
        if (name === 'close') printer.classList.remove('open');
        else printer.classList.add(s[2]);
        if (name === 'feed') {
          printer.classList.add('feeding', 'ok');
          actions.hidden = true;
          idBox.hidden = false;
        } else {
          promptSteps.textContent = 'Step ' + (st.step + 1) + ' of 6 — clear the jam in order:';
        }
        FM.audio.play(s[3]);
        ctx.pulse('good');
        ctx.status(s[4], 'good');
      }

      function pickId(id, btn) {
        if (!ctx.live() || st.step < STEPS.length || idPicked) return;
        idPicked = true;
        if (id === order) {
          btn.classList.add('done');
          st.step = 6;
          syncTrack();
          out.textContent = order;
          out.classList.add('matched');
          FM.audio.play('printOk');
          ctx.pulse('good');
          ctx.win('Jam cleared and the right label is on the parcel.');
        } else {
          shake(btn);
          btn.classList.add('bad-pick');
          idBtns.forEach(function (b) { if (b.getAttribute('data-id') === order) b.classList.add('reveal-ok'); });
          ctx.fail('Wrong Order ID - ' + id + ' does not match the slip (' + order + ').');
        }
      }

      U.shuffle(STEPS).forEach(function (s) {
        var b = el('button', { type: 'button', 'class': 'mg-btn', 'data-step': s[0], text: s[1] });
        b.addEventListener('click', function () { act(s[0], b); });
        actions.appendChild(b);
      });
      st.ids.forEach(function (id) {
        var b = el('button', { type: 'button', 'class': 'mg-btn pj-id', 'data-id': id, text: id });
        b.addEventListener('click', function () { pickId(id, b); });
        idBtns.push(b);
        idBox.appendChild(b);
      });

      ctx.root.appendChild(el('div', { 'class': 'pj-wrap' }, [
        el('div', { 'class': 'pj-left' }, [
          el('div', { 'class': 'pj-slip' }, ['Packing slip', el('b', { text: 'ORDER ' + order })]),
          printer,
          track
        ]),
        el('div', { 'class': 'pj-right' }, [actions, idBox])
      ]));
      ctx.status('Printer jammed. Start with the lid.');
    }
  });
})();
