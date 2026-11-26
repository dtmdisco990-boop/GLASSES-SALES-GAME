/* Frame Margin — difficulty curve, tutorial level and strict content self-check */
(function () {
  'use strict';
  var FM = window.FM;

  /* Level 1: 12% floor, 15s replies, 84 patience  ->  Level 15: 33% strict ($0.00), 6.5s replies, 54 patience */
  FM.levelCfg = function (n) {
    var base = FM.LEVELS[n - 1], k = n - 1, cfg = {}, key;
    var tier = n <= 4 ? 1 : n <= 9 ? 2 : n <= 14 ? 3 : 4;
    var drain = 0.85 + 0.08 * k;               // patience lost per second while the buyer waits
    if (tier === 3) drain *= 1.12;             // double-problem buyers drain faster
    if (tier === 4) drain = 2.25;              // final boss: relentless drain yet readable under optimal play
    for (key in base) cfg[key] = base[key];
    cfg.n = n;
    cfg.tier = tier;
    cfg.timer = n === FM.MAX_LEVEL ? 6.5 : Math.round((15 - 0.6 * k) * 100) / 100;
    cfg.floor = 12 + 1.5 * k;
    cfg.patienceStart = n === FM.MAX_LEVEL ? 54 : 84 - 2 * k;
    cfg.drain = Math.round(drain * 100) / 100;
    cfg.mult = Math.round((1 + 0.06 * k) * 1000) / 1000;
    cfg.strict = n === FM.MAX_LEVEL;           // final boss: giving away even $0.01 loses
    cfg.d = k / (FM.MAX_LEVEL - 1);            // 0..1 difficulty for the side-tasks
    return cfg;
  };

  FM.TUTORIAL = {
    n: 0, tier: 0, name: 'Tutorial', user: 'practice_pat', fb: 12, color: '#2a9d8f',
    item: 'Demo Round 49-20-145', art: { shape: 'round', frame: '#2a6f97', lens: '#a9d6e5' },
    tasks: [], timer: 40, floor: 10, patienceStart: 100, drain: 0.5, mult: 0.6, strict: false, d: 0,
    rounds: [
      {
        m: ["Hi. I paid $100 for these frames, but honestly that's too much. Send $40 back or I cancel."],
        o: [
          {
            k: 'b',
            text: "Thanks for messaging. The price was set at checkout, so I can't discount it - returns are open if needed.",
            reply: "Policies, policies. Everyone on eBay cuts deals if you ask."
          },
          {
            k: 'g', give: 20,
            text: "I hear you - I can send $20.00 back as a one-time courtesy so we can get these shipped out today.",
            why: "Early concession tells the buyer your price is soft",
            reply: "See? You knocked $20 off instantly. Clearly there's room for more."
          },
          {
            k: 'w',
            text: "Hmm, I'm not totally sure what I can do on price after checkout - let me think about it later.",
            why: "Stalling vaguely invites the buyer to escalate",
            reply: "Think about it later? I asked a yes-or-no question."
          },
          {
            k: 't',
            trap: "Condescending blame",
            why: "Scolding buyers for clicking Buy turns price chats into cancellations",
            text: "You saw the $100 total before clicking Buy - complaining about the price afterward wastes both our time.",
            reply: "Wasting YOUR time?! Way to talk to a paying customer."
          }
        ]
      },
      {
        m: ["Other sellers do $15 off all the time. Come on, meet me halfway."],
        branch: {
          b: ["Fine, no $40. Other eyewear sellers still do $15 partial refunds all the time - meet me halfway."],
          g: ["You already dropped $20 without blinking, so add $15 more and I won't bother canceling."],
          w: ["Still no real answer. Other sellers knock $15 off right away - are you doing it or not?"],
          t: ["After telling me I'm wasting your time, the least you can do is $15 off right now."]
        },
        o: [
          {
            k: 'b',
            text: "I can't adjust a completed sale, sorry. Your pair ships tracked today, and our 30-day return covers you.",
            reply: "Alright, at least you're straight about it."
          },
          {
            k: 'g', give: 15,
            text: "Okay, I'll take $15.00 off right now so we can wrap this up and get your frames on the way.",
            why: "Caving to a second demand drains your margin fast",
            reply: "Now we're talking. Glad I pushed."
          },
          {
            k: 'w',
            text: "I wish I could match other shops, honestly, margins on eyewear are just really tough this month.",
            why: "Complaining about your margins leaves policy unclear",
            reply: "Your margins aren't my concern - I wanted an actual answer."
          },
          {
            k: 't',
            trap: "Policy trap",
            why: "Offering off-eBay payment workarounds violates eBay policy",
            text: "If you message me on Venmo outside eBay I can knock off the platform fees and send $15 back directly.",
            reply: "Trying to take a buyer off eBay? I'm reporting this chat."
          }
        ]
      }
    ],
    close: "OK, thanks for explaining clearly. Ship them!",
    closeBranch: {
      gave: "Good thing you sent that partial refund. Go ahead and ship them.",
      tense: "Rough conversation, honestly, but fine - ship the frames."
    }
  };

  /* returns a list of problems in the level data (empty list = healthy) */
  FM.validateLevels = function () {
    var errs = [], all = FM.LEVELS.concat([FM.TUTORIAL]);
    var kinds = ['b', 'g', 'w', 't'], bLongestCount = 0, bShortestCount = 0, mainRounds = 0;

    if (FM.LEVELS.length !== FM.MAX_LEVEL) errs.push('expected ' + FM.MAX_LEVEL + ' levels, found ' + FM.LEVELS.length);

    all.forEach(function (L, i) {
      var isTut = i === FM.LEVELS.length;
      var tag = isTut ? 'TUT' : 'L' + (i + 1);
      var wantRounds = isTut ? 2 : (i === FM.MAX_LEVEL - 1 ? 5 : 4);
      var cfg = isTut ? L : FM.levelCfg(i + 1);
      var roomC = FM.calc.headroomC(cfg);
      var gives = [];

      if (L.rounds.length !== wantRounds) errs.push(tag + ': ' + L.rounds.length + ' rounds, wanted ' + wantRounds);
      if (!L.close || typeof L.close !== 'string') errs.push(tag + ': missing close string');
      if (!L.closeBranch || !L.closeBranch.gave || !L.closeBranch.tense) errs.push(tag + ': missing closeBranch.gave / tense');

      (L.tasks || []).forEach(function (t) {
        if (FM.mg && !FM.mg.defs[t.id]) errs.push(tag + ': unknown side-task ' + t.id);
        if (t.after < 1 || t.after >= L.rounds.length) errs.push(tag + ': side-task after round ' + t.after + ' is out of range');
      });

      L.rounds.forEach(function (R, j) {
        var at = tag + ' R' + (j + 1);
        var isDouble = !isTut && i >= 9 && i <= 14;
        var counts = { b: 0, g: 0, w: 0, t: 0 };
        var opts, maxLen = 0, minLen = Infinity, bLen = 0, maxCount = 0, minCount = 0;

        if (!R.m || !R.m.length) errs.push(at + ': no customer message');
        if (isDouble && R.m.length < 2) errs.push(at + ': double-problem level needs two demands');

        if (j > 0) {
          if (!R.branch || typeof R.branch !== 'object') {
            errs.push(at + ': missing branch object');
          } else {
            var seen = {};
            kinds.forEach(function (k) {
              var bm = R.branch[k];
              if (!Array.isArray(bm) || !bm.length) {
                errs.push(at + ': missing branch.' + k);
              } else {
                if (isDouble && bm.length < 2) errs.push(at + ': branch.' + k + ' needs two demands');
                bm.forEach(function (line) {
                  if (typeof line !== 'string' || !line.trim()) errs.push(at + ': empty message in branch.' + k);
                });
                var joined = bm.join(' || ');
                if (seen[joined]) errs.push(at + ': branch.' + k + ' duplicates branch.' + seen[joined]);
                seen[joined] = k;
              }
            });
          }
        }

        if (!Array.isArray(R.o) || R.o.length !== 4) {
          errs.push(at + ': needs 4 replies');
          return;
        }

        opts = R.o.map(FM.normalizeOpt);
        opts.forEach(function (o) {
          var trig = FM.findTrigger(o.text);
          if (counts[o.kind] === undefined) { errs.push(at + ': invalid option kind ' + o.kind); return; }
          counts[o.kind]++;
          if (!o.text || typeof o.text !== 'string') errs.push(at + ': empty option text');
          if (!o.reply || typeof o.reply !== 'string') errs.push(at + ': option (' + o.kind + ') missing bespoke reply');
          if (o.kind !== 't' && trig) errs.push(at + ': "' + trig + '" hidden in non-trap (' + o.kind + ') reply: ' + o.text);
          if (o.kind === 't' && (!o.trap || !o.why)) errs.push(at + ': tonal trap missing trap label or why explanation');
          if (o.kind === 'w' && !o.why) errs.push(at + ': weak reply missing why explanation');
          if (o.kind === 'g') {
            if (!(o.give > 0)) errs.push(at + ': concession without an amount');
            if (o.text.indexOf('$') === -1) errs.push(at + ': concession text should show the amount');
            gives.push(Math.round(o.give * 100));
            if (!isTut && !cfg.strict && Math.round(o.give * 100) > roomC) {
              errs.push(at + ': single concession $' + o.give + ' exceeds headroom $' + (roomC / 100).toFixed(2));
            }
          }
          if (!isTut && i === FM.MAX_LEVEL - 1 && o.text.length > 82) {
            errs.push(at + ': L15 option too long (' + o.text.length + ' chars > 82): ' + o.text);
          } else if (!isTut && i >= 11 && o.text.length > 98) {
            errs.push(at + ': high-tier option too long (' + o.text.length + ' chars > 98): ' + o.text);
          }
          if (o.text.length > maxLen) maxLen = o.text.length;
          if (o.text.length < minLen) minLen = o.text.length;
          if (o.kind === 'b') bLen = o.text.length;
        });

        kinds.forEach(function (k) {
          if (counts[k] !== 1) errs.push(at + ': needs 1 "' + k + '" option, has ' + counts[k]);
        });

        if (!isTut) {
          mainRounds++;
          opts.forEach(function (o) {
            if (o.text.length === maxLen) maxCount++;
            if (o.text.length === minLen) minCount++;
          });
          if (bLen === maxLen && maxCount === 1) bLongestCount++;
          if (bLen === minLen && minCount === 1) bShortestCount++;
        }
      });

      /* ensure no two concessions on L1-L14 can both fit inside margin headroom */
      if (!isTut && !cfg.strict && gives.length >= 2) {
        gives.sort(function (a, b) { return a - b; });
        if (gives[0] + gives[1] <= roomC) {
          errs.push(tag + ': two smallest concessions ($' + (gives[0] / 100).toFixed(2) + ' + $' + (gives[1] / 100).toFixed(2) + ') fit under headroom $' + (roomC / 100).toFixed(2));
        }
      }
    });

    if (mainRounds > 0 && bLongestCount / mainRounds > 0.4) {
      errs.push('length tell: "b" is strictly longest in ' + bLongestCount + '/' + mainRounds + ' rounds (>40%)');
    }
    if (mainRounds > 0 && bShortestCount / mainRounds > 0.4) {
      errs.push('length tell: "b" is strictly shortest in ' + bShortestCount + '/' + mainRounds + ' rounds (>40%)');
    }
    return errs;
  };
})();
