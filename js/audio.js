/* Frame Margin — every sound is synthesised with the Web Audio API (no audio files) */
(function () {
  'use strict';
  var FM = window.FM;
  var VOL = 0.55;
  var A = FM.audio = { ctx: null, master: null, analyser: null, muted: false, played: [], counts: {}, errors: [] };
  var noiseBuf = null;
  var stepFlip = 0;

  /* must be called from a user gesture (the START click) */
  A.init = function () {
    if (A.ctx) { if (A.ctx.state === 'suspended') A.ctx.resume(); return true; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      var c = new AC(), len = c.sampleRate, d, i, comp;
      A.master = c.createGain();
      A.master.gain.value = A.muted ? 0 : VOL;
      A.analyser = c.createAnalyser();
      A.analyser.fftSize = 2048;
      comp = c.createDynamicsCompressor();
      A.master.connect(A.analyser);
      A.analyser.connect(comp);
      comp.connect(c.destination);
      noiseBuf = c.createBuffer(1, len, c.sampleRate);
      d = noiseBuf.getChannelData(0);
      for (i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      A.ctx = c;
      if (c.state === 'suspended') c.resume();
    } catch (e) {
      A.ctx = null;
      A.errors.push('init: ' + e.message);
      return false;
    }
    return true;
  };

  A.setMuted = function (m) {
    A.muted = !!m;
    if (A.ctx && A.master) A.master.gain.setTargetAtTime(A.muted ? 0 : VOL, A.ctx.currentTime, 0.01);
  };

  /* peak amplitude currently flowing through the master bus — used to confirm real output */
  A.peak = function () {
    if (!A.analyser) return 0;
    var buf = new Float32Array(A.analyser.fftSize), i, p = 0;
    A.analyser.getFloatTimeDomainData(buf);
    for (i = 0; i < buf.length; i++) if (Math.abs(buf[i]) > p) p = Math.abs(buf[i]);
    return p;
  };

  function tone(o) {
    var c = A.ctx, t0 = c.currentTime + (o.t || 0), d = Math.max(0.012, o.d || 0.12);
    var osc = c.createOscillator(), g = c.createGain();
    var atk = Math.max(0.001, Math.min(o.a || 0.004, d * 0.45));
    var f1 = Math.max(20, o.f || 440);
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(f1, t0);
    if (o.f2) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t0 + d);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(Math.max(0.001, o.g || 0.2), t0 + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    osc.connect(g); g.connect(A.master);
    osc.start(t0); osc.stop(t0 + d + 0.03);
  }

  function noise(o) {
    if (!noiseBuf) return;
    var c = A.ctx, t0 = c.currentTime + (o.t || 0), d = Math.max(0.012, o.d || 0.08);
    var src = c.createBufferSource(), flt = c.createBiquadFilter(), g = c.createGain();
    var atk = Math.max(0.001, Math.min(o.a || 0.002, d * 0.45));
    src.buffer = noiseBuf; src.loop = true;
    flt.type = o.type || 'highpass';
    flt.frequency.setValueAtTime(Math.max(20, o.f || 1000), t0);
    if (o.f2) flt.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t0 + d);
    flt.Q.value = o.q || 0.7;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(Math.max(0.001, o.g || 0.3), t0 + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    src.connect(flt); flt.connect(g); g.connect(A.master);
    src.start(t0, Math.random() * 0.5); src.stop(t0 + d + 0.03);
  }

  function arp(freqs, gap, o) {
    o = o || {};
    var start = o.t || 0;
    freqs.forEach(function (f, i) {
      tone({ f: f, type: o.type || 'triangle', t: start + i * gap, d: o.d || 0.16, g: o.g || 0.18 });
    });
  }

  var S = {
    /* interface */
    click: function () { tone({ f: 720, f2: 520, type: 'triangle', d: 0.06, g: 0.18 }); },
    start: function () { arp([392, 523, 659, 784], 0.07, { d: 0.18, g: 0.2 }); },
    unlock: function () { arp([784, 988, 1175, 1568], 0.06, { type: 'sine', d: 0.2, g: 0.14 }); },
    /* photo table */
    slide: function () { noise({ type: 'bandpass', f: 500, f2: 1800, q: 0.8, d: 0.45, g: 0.55, a: 0.08 }); },
    clack: function () {
      tone({ f: 1400, f2: 700, type: 'square', d: 0.03, g: 0.1 });
      noise({ f: 3000, d: 0.03, g: 0.2 });
      tone({ f: 900, f2: 500, type: 'square', t: 0.05, d: 0.03, g: 0.07 });
    },
    /* crisp two-stage camera shutter: mirror slap, then the curtain closing */
    shutter: function () {
      noise({ type: 'highpass', f: 3200, d: 0.022, g: 0.75 });
      tone({ f: 2400, f2: 900, type: 'square', d: 0.014, g: 0.22 });
      tone({ f: 160, f2: 70, type: 'sine', d: 0.05, g: 0.35 });
      noise({ type: 'bandpass', f: 4500, q: 1.2, t: 0.065, d: 0.03, g: 0.6 });
      tone({ f: 1900, f2: 700, type: 'square', t: 0.065, d: 0.012, g: 0.18 });
      noise({ type: 'highpass', f: 6000, t: 0.1, d: 0.05, g: 0.12 });
    },
    bag: function () {
      noise({ type: 'bandpass', f: 2400, f2: 900, q: 0.6, d: 0.28, g: 0.5, a: 0.03 });
      noise({ type: 'bandpass', f: 1500, f2: 3200, q: 0.6, t: 0.22, d: 0.22, g: 0.4, a: 0.03 });
    },
    zip: function () { noise({ type: 'bandpass', f: 900, f2: 4200, q: 3, d: 0.3, g: 1.6, a: 0.01 }); },
    stamp: function () {
      tone({ f: 145, f2: 58, d: 0.13, g: 0.5 });
      noise({ type: 'lowpass', f: 950, d: 0.065, g: 0.34 });
      noise({ type: 'bandpass', f: 2600, q: 1.5, d: 0.025, g: 0.18 });
    },
    monitor: function () {
      noise({ type: 'lowpass', f: 300, f2: 1200, d: 0.5, g: 0.2, a: 0.1 });
      tone({ f: 660, t: 0.5, d: 0.1, g: 0.12 });
      tone({ f: 990, t: 0.6, d: 0.16, g: 0.12 });
    },
    /* chat */
    msgIn: function () { tone({ f: 620, d: 0.08, g: 0.2 }); tone({ f: 930, t: 0.08, d: 0.12, g: 0.2 }); },
    msgOut: function () { tone({ f: 520, f2: 1040, d: 0.12, g: 0.16 }); noise({ type: 'highpass', f: 2500, d: 0.08, g: 0.05 }); },
    tick: function () { tone({ f: 1300, type: 'square', d: 0.03, g: 0.09 }); },
    good: function () { arp([660, 880], 0.08, { d: 0.13, g: 0.16 }); },
    give: function () { arp([1200, 1000, 800], 0.07, { d: 0.1, g: 0.16 }); },
    hurt: function () { tone({ f: 220, f2: 110, type: 'sawtooth', d: 0.22, g: 0.22 }); noise({ type: 'lowpass', f: 500, d: 0.1, g: 0.25 }); },
    trigger: function () {
      tone({ f: 180, f2: 90, type: 'sawtooth', d: 0.5, g: 0.3 });
      tone({ f: 191, f2: 96, type: 'square', d: 0.5, g: 0.2 });
      noise({ type: 'bandpass', f: 1200, q: 2, d: 0.25, g: 0.3 });
    },
    win: function () {
      noise({ type: 'highpass', f: 4000, d: 0.05, g: 0.25 });
      tone({ f: 1568, type: 'triangle', t: 0.05, d: 0.4, g: 0.22 });
      tone({ f: 2093, type: 'triangle', t: 0.13, d: 0.5, g: 0.22 });
      tone({ f: 2637, t: 0.13, d: 0.5, g: 0.1 });
    },
    lose: function () { arp([392, 330, 262, 196], 0.16, { type: 'sawtooth', d: 0.24, g: 0.14 }); },
    victory: function () { arp([523, 659, 784, 1047, 784, 1047, 1319], 0.12, { d: 0.3, g: 0.2 }); },

    /* store emergencies — shared */
    alarm: function () {
      for (var i = 0; i < 3; i++) {
        tone({ f: 880, type: 'square', t: i * 0.28, d: 0.12, g: 0.14 });
        tone({ f: 660, type: 'square', t: i * 0.28 + 0.13, d: 0.12, g: 0.14 });
      }
    },
    urgentTick: function () {
      tone({ f: 1480, f2: 1120, type: 'triangle', d: 0.032, g: 0.11 });
      noise({ type: 'highpass', f: 4200, d: 0.018, g: 0.09 });
    },
    toggle: function () {
      tone({ f: 560, f2: 700, type: 'triangle', d: 0.045, g: 0.14 });
      noise({ type: 'highpass', f: 3400, d: 0.016, g: 0.12 });
    },
    select: function () {
      tone({ f: 740, f2: 960, type: 'sine', d: 0.06, g: 0.14 });
      noise({ type: 'bandpass', f: 3200, q: 2, d: 0.02, g: 0.08 });
    },
    err: function () {
      tone({ f: 185, f2: 145, type: 'sawtooth', d: 0.13, g: 0.18 });
      tone({ f: 132, f2: 98, type: 'square', t: 0.11, d: 0.17, g: 0.18 });
      noise({ type: 'lowpass', f: 600, d: 0.08, g: 0.16 });
    },
    ok: function () {
      noise({ type: 'lowpass', f: 900, d: 0.05, g: 0.22 });
      arp([659, 880, 1319], 0.065, { type: 'triangle', d: 0.18, g: 0.18 });
      tone({ f: 1760, type: 'sine', t: 0.15, d: 0.24, g: 0.09 });
    },
    fail: function () {
      tone({ f: 280, f2: 88, type: 'sawtooth', d: 0.48, g: 0.22 });
      tone({ f: 210, f2: 66, type: 'triangle', t: 0.06, d: 0.46, g: 0.18 });
      noise({ type: 'lowpass', f: 450, d: 0.18, g: 0.24 });
    },

    /* 1 — robber chase */
    step: function () {
      stepFlip ^= 1;
      var base = stepFlip ? 310 : 275;
      tone({ f: base, f2: base * 0.65, type: 'triangle', d: 0.042, g: 0.13 });
      noise({ type: 'bandpass', f: stepFlip ? 1900 : 1650, q: 1.4, d: 0.024, g: 0.14 });
    },
    robberStep: function () {
      var f = 195 + Math.random() * 35;
      tone({ f: f, f2: f * 0.6, type: 'sine', d: 0.036, g: 0.09 });
      noise({ type: 'bandpass', f: 1300, q: 1.2, d: 0.02, g: 0.1 });
    },
    juke: function () {
      /* crisp sneaker-pivot screech + quick air whoosh */
      tone({ f: 1450, f2: 2450, type: 'sine', d: 0.075, g: 0.15 });
      tone({ f: 2300, f2: 1180, type: 'triangle', t: 0.06, d: 0.09, g: 0.13 });
      noise({ type: 'bandpass', f: 2600, f2: 950, q: 2.6, d: 0.15, g: 0.34, a: 0.01 });
    },
    bump: function () {
      /* solid rack thud + faint glass display rattle */
      tone({ f: 128, f2: 64, type: 'triangle', d: 0.085, g: 0.28 });
      noise({ type: 'lowpass', f: 650, d: 0.06, g: 0.28 });
      tone({ f: 1680, f2: 1420, type: 'sine', t: 0.02, d: 0.055, g: 0.055 });
    },
    'catch': function () {
      /* tackle body impact + tray chime + victory triad */
      tone({ f: 150, f2: 48, type: 'sine', d: 0.14, g: 0.45 });
      noise({ type: 'lowpass', f: 850, d: 0.12, g: 0.48 });
      noise({ type: 'highpass', f: 3400, t: 0.03, d: 0.06, g: 0.16 });
      arp([440, 587, 880, 1175], 0.065, { type: 'triangle', t: 0.05, d: 0.18, g: 0.18 });
    },
    escape: function () {
      /* shop door bell ding + fleeing whoosh */
      noise({ type: 'bandpass', f: 900, f2: 2600, q: 1.2, d: 0.22, g: 0.28 });
      tone({ f: 1047, type: 'sine', t: 0.05, d: 0.26, g: 0.16 });
      tone({ f: 784, type: 'sine', t: 0.16, d: 0.3, g: 0.14 });
    },

    /* 2 — label printer jam */
    lid: function () {
      /* plastic latch click + hinged spring up */
      noise({ type: 'bandpass', f: 2800, q: 1.8, d: 0.025, g: 0.25 });
      tone({ f: 220, f2: 390, type: 'triangle', d: 0.075, g: 0.16 });
      noise({ type: 'lowpass', f: 900, t: 0.05, d: 0.055, g: 0.2 });
    },
    lidClose: function () {
      /* crisp snap shut + resonant chassis thunk */
      tone({ f: 320, f2: 135, type: 'triangle', d: 0.085, g: 0.22 });
      noise({ type: 'lowpass', f: 820, d: 0.06, g: 0.34 });
      tone({ f: 1350, f2: 800, type: 'square', t: 0.03, d: 0.024, g: 0.09 });
    },
    rip: function () {
      /* sticky thermal-label peel & rip */
      noise({ type: 'bandpass', f: 3400, f2: 1200, q: 1.7, d: 0.19, g: 0.42, a: 0.01 });
      noise({ type: 'highpass', f: 4200, t: 0.09, d: 0.11, g: 0.24 });
      tone({ f: 520, f2: 240, type: 'sawtooth', d: 0.09, g: 0.06 });
    },
    roll: function () {
      /* label roll spindle dropping into axle detent */
      tone({ f: 240, f2: 180, type: 'triangle', d: 0.045, g: 0.16 });
      noise({ type: 'bandpass', f: 1800, q: 2, d: 0.03, g: 0.16 });
      tone({ f: 420, f2: 520, type: 'triangle', t: 0.065, d: 0.055, g: 0.16 });
    },
    feed: function () {
      /* thermal stepper motor bursts + paper slide + cutter snip */
      for (var i = 0; i < 6; i++) {
        tone({ f: 155 + (i % 2) * 28, type: 'sawtooth', t: i * 0.055, d: 0.045, g: 0.12 });
      }
      noise({ type: 'bandpass', f: 2100, f2: 2900, q: 1.8, d: 0.36, g: 0.13, a: 0.03 });
      noise({ type: 'highpass', f: 4800, t: 0.35, d: 0.028, g: 0.25 });
      tone({ f: 1180, f2: 1560, type: 'sine', t: 0.37, d: 0.09, g: 0.12 });
    },
    printOk: function () {
      arp([880, 1175, 1760], 0.055, { type: 'sine', d: 0.14, g: 0.15 });
    },

    /* 3 — wrong prescription lens tray */
    holdOn: function () {
      /* crisp optical desk hold-switch lock */
      tone({ f: 520, f2: 680, type: 'triangle', d: 0.065, g: 0.16 });
      tone({ f: 880, type: 'sine', t: 0.065, d: 0.11, g: 0.14 });
    },
    quarantine: function () {
      /* tray slide + hollow quarantine bin drop */
      noise({ type: 'bandpass', f: 1600, f2: 750, q: 1.2, d: 0.16, g: 0.28, a: 0.01 });
      tone({ f: 210, f2: 105, type: 'triangle', t: 0.11, d: 0.1, g: 0.26 });
      noise({ type: 'lowpass', f: 700, t: 0.11, d: 0.07, g: 0.24 });
    },
    lensPop: function () {
      /* clean optical-glass tap / pop */
      tone({ f: 980, f2: 1380, type: 'sine', d: 0.055, g: 0.14 });
      tone({ f: 2240, type: 'sine', t: 0.012, d: 0.04, g: 0.06 });
    },
    verifyOk: function () {
      arp([784, 1047, 1568], 0.06, { type: 'sine', d: 0.16, g: 0.16 });
    },

    /* 4 — INAD dispute */
    docAttach: function () {
      /* crisp paper-clip snap + light paper rustle */
      noise({ type: 'bandpass', f: 3200, f2: 4600, q: 1.6, d: 0.04, g: 0.22 });
      tone({ f: 640, f2: 960, type: 'triangle', d: 0.055, g: 0.14 });
    },
    docDetach: function () {
      /* softer downward unclip flick */
      noise({ type: 'bandpass', f: 2800, f2: 1600, q: 1.4, d: 0.035, g: 0.15 });
      tone({ f: 620, f2: 420, type: 'triangle', d: 0.05, g: 0.11 });
    },
    caseStamp: function () {
      /* firm ink stamp + eBay case submitted ping */
      tone({ f: 140, f2: 56, type: 'sine', d: 0.13, g: 0.45 });
      noise({ type: 'lowpass', f: 880, d: 0.06, g: 0.34 });
      tone({ f: 1047, type: 'triangle', t: 0.09, d: 0.16, g: 0.14 });
    },

    /* 5 — scratched frame inspection */
    loupe: function () {
      /* precision inspection reticle click + faint glass ping */
      noise({ type: 'highpass', f: 4500, d: 0.018, g: 0.18 });
      tone({ f: 1120, f2: 1480, type: 'sine', d: 0.05, g: 0.12 });
    },
    sparkle: function () {
      /* microfiber cloth sweep + bright inspection verification sparkle */
      noise({ type: 'bandpass', f: 1800, f2: 4800, q: 1.2, d: 0.16, g: 0.22, a: 0.02 });
      arp([1175, 1568, 2093, 2637], 0.045, { type: 'sine', t: 0.06, d: 0.16, g: 0.11 });
    },

    /* 6 — bulk inventory recount */
    countBlip: function () {
      /* crisp mechanical tally-counter click */
      noise({ type: 'highpass', f: 3800, d: 0.015, g: 0.16 });
      tone({ f: 840, f2: 640, type: 'triangle', d: 0.038, g: 0.13 });
    },
    cartonTap: function () {
      /* hollow cardboard knock */
      var f = 185 + Math.random() * 28;
      tone({ f: f, f2: f * 0.58, type: 'triangle', d: 0.055, g: 0.2 });
      noise({ type: 'bandpass', f: 950, q: 1.5, d: 0.03, g: 0.2 });
    },
    registerChime: function () {
      /* classic inventory/cash-register bell confirmation */
      noise({ type: 'highpass', f: 4200, d: 0.025, g: 0.18 });
      tone({ f: 1568, type: 'sine', t: 0.02, d: 0.34, g: 0.18 });
      tone({ f: 3136, type: 'sine', t: 0.02, d: 0.22, g: 0.07 });
      tone({ f: 2093, type: 'triangle', t: 0.09, d: 0.36, g: 0.16 });
    },

    /* 7 — courier pickup cutoff */
    beep: function () {
      tone({ f: 1760, type: 'square', d: 0.085, g: 0.12 });
      tone({ f: 2640, type: 'sine', d: 0.07, g: 0.07 });
    },
    scanBeep: function () {
      /* realistic dual-harmonic laser barcode scanner chirp */
      tone({ f: 2150, type: 'square', d: 0.065, g: 0.1 });
      tone({ f: 2880, type: 'sine', d: 0.08, g: 0.13 });
      noise({ type: 'highpass', f: 5200, d: 0.02, g: 0.08 });
    },
    scanReady: function () {
      /* subtle crisp scanner-ready ping when cooldown clears */
      tone({ f: 1320, f2: 1760, type: 'sine', d: 0.065, g: 0.095 });
    },
    scanBusy: function () {
      /* muffled handheld scanner rejection buzz */
      tone({ f: 240, type: 'sawtooth', d: 0.07, g: 0.14 });
      tone({ f: 190, type: 'sawtooth', t: 0.08, d: 0.09, g: 0.14 });
    },
    dispatch: function () {
      /* packing tape zip + clipboard stamp + courier ready chime */
      noise({ type: 'bandpass', f: 1100, f2: 3900, q: 2.5, d: 0.16, g: 0.45, a: 0.01 });
      tone({ f: 145, f2: 60, type: 'sine', t: 0.12, d: 0.1, g: 0.35 });
      arp([659, 988, 1319], 0.055, { type: 'triangle', t: 0.14, d: 0.15, g: 0.15 });
    }
  };
  A.names = Object.keys(S);

  A.play = function (name) {
    A.played.push(name);
    if (A.played.length > 400) A.played.shift();
    A.counts[name] = (A.counts[name] || 0) + 1;
    if (!S[name]) { A.errors.push('unknown sound: ' + name); return false; }
    if (!A.ctx || A.muted) return false;
    try {
      if (A.ctx.state === 'suspended') A.ctx.resume();
      S[name]();
      return true;
    } catch (e) {
      A.errors.push(name + ': ' + e.message);
      return false;
    }
  };

  /* builds every sound's node graph once and reports anything that throws */
  A.selfTest = function () {
    var out = { hasContext: !!A.ctx, state: A.ctx ? A.ctx.state : 'none', total: A.names.length, failed: [] };
    if (!A.ctx) return out;
    A.names.forEach(function (n) {
      try { S[n](); } catch (e) { out.failed.push(n + ': ' + e.message); }
    });
    return out;
  };
})();
