/* Side-task 1 — Store Robber Chase
   Top-down 11x7 grid. Robber: Entrance (1,3) -> top or bottom aisle -> Exit (9,3). Player starts on the Exit. */
(function () {
  'use strict';
  var FM = window.FM, U = FM.util, el = U.el;

  var MAP = [
    '###########',
    '#.........#',   // top aisle    (y = 1)
    '#.RR.RR.R.#',
    '#ERR.RR.RX#',   // E = entrance (1,3)   X = exit (9,3)   R = glass display rack
    '#.RR.RR.R.#',
    '#.........#',   // bottom aisle (y = 5)
    '###########'
  ];
  var COLS = 11, ROWS = 7, ENTRANCE = { x: 1, y: 3 }, EXIT = { x: 9, y: 3 }, CROSS = [4, 7], TOP = 1, BOTTOM = 5;
  var KEYS = {
    ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
    w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0]
  };
  var DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function open(x, y) {
    var c = MAP[y] ? MAP[y].charAt(x) : '#';
    return c === '.' || c === 'E' || c === 'X';
  }

  /* shortest walkable distance between two open tiles on the 11x7 floor */
  function walkDist(ax, ay, bx, by) {
    var q = [[ax, ay, 0]], seen = {}, k, cur, i, nx, ny;
    if (ax === bx && ay === by) return 0;
    seen[ax + ',' + ay] = 1;
    while (q.length) {
      cur = q.shift();
      for (i = 0; i < 4; i++) {
        nx = cur[0] + DIRS[i][0];
        ny = cur[1] + DIRS[i][1];
        if (!open(nx, ny)) continue;
        if (nx === bx && ny === by) return cur[2] + 1;
        k = nx + ',' + ny;
        if (!seen[k]) { seen[k] = 1; q.push([nx, ny, cur[2] + 1]); }
      }
    }
    return 99;
  }

  function dirName(dx, dy) {
    return dx > 0 ? 'r' : dx < 0 ? 'l' : dy < 0 ? 'u' : dy > 0 ? 'd' : 'r';
  }

  FM.mg.register('robber', {
    title: 'Store Robber Chase',
    MAP: MAP, ENTRANCE: ENTRANCE, EXIT: EXIT,
    brief: function (d, tutorial) {
      var agile = !tutorial && d >= 0.55;
      return '<p>A robber grabbed a tray of frames at the <b>entrance</b> and is sprinting down the <b>top or bottom aisle</b> for the <b>EXIT</b>.</p>' +
        '<p>You start at the exit. Move with <b>Arrow keys</b>, <b>WASD</b> or the on-screen <b>D-pad</b> and tackle the robber <b>in an aisle</b> before they reach the door.</p>' +
        '<p>Standing in the doorway will not stop them' +
        (agile
          ? ' — and this robber <b>reads your position and jukes around display racks</b>! Watch for the <b>JUKE!</b> pivot flash.'
          : ', and they may cut through a cross-aisle.') + '</p>';
    },
    build: function (ctx) {
      var grid = el('div', { 'class': 'rb-grid' }), pad = el('div', { 'class': 'rb-pad' });
      var fxLayer = el('div', { 'class': 'rb-fx', 'aria-hidden': 'true' });
      var robberEl = el('div', { 'class': 'rb-ent rb-robber', 'data-dir': 'r' }, el('span'));
      var playerEl = el('div', { 'class': 'rb-ent rb-player', 'data-dir': 'l' }, el('span'));
      var cells = [], padBtns = {}, exitCell = null;
      var timer = 0, holdDelay = 0, holdInt = 0, lastMove = 0, x, y, c, cls, cell;
      var maxFeints = ctx.tutorial ? 0 : (ctx.d < 0.25 ? 0 : ctx.d < 0.5 ? 1 : ctx.d < 0.78 ? 2 : 3);
      var stepMs = ctx.tutorial ? 520 : Math.round(U.lerp(360, 185, ctx.d));
      var telegraphMs = Math.round(U.lerp(175, 130, ctx.d));

      var st = ctx.state = {
        cols: COLS, rows: ROWS,
        player: { x: EXIT.x, y: EXIT.y },
        robber: { x: ENTRANCE.x, y: ENTRANCE.y },
        aisle: Math.random() < 0.5 ? TOP : BOTTOM,
        feints: maxFeints,
        maxFeints: maxFeints,
        jukesUsed: 0,
        stepMs: stepMs,
        steps: 0,
        committed: false,
        backtrackTo: null,
        crossPivotCol: -1,
        telegraphing: false,
        jukeCooldown: 0
      };

      robberEl.style.transitionDuration = Math.min(130, Math.round(stepMs * 0.7)) + 'ms';

      for (y = 0; y < ROWS; y++) {
        cells[y] = [];
        for (x = 0; x < COLS; x++) {
          c = MAP[y].charAt(x);
          cls = c === '#' ? 'wall' : c === 'R' ? 'rack' : c === 'E' ? 'entrance' : c === 'X' ? 'exit' : 'floor';
          cell = el('div', { 'class': 'rb-cell ' + cls, text: c === 'E' ? 'IN' : c === 'X' ? 'EXIT' : '' });
          if (c === 'X') exitCell = cell;
          cells[y][x] = cell;
          grid.appendChild(cell);
        }
      }
      grid.appendChild(fxLayer);
      grid.appendChild(robberEl);
      grid.appendChild(playerEl);

      function place(node, p, dx, dy) {
        node.style.transform = 'translate(' + (p.x * 100) + '%,' + (p.y * 100) + '%)';
        if (dx || dy) node.setAttribute('data-dir', dirName(dx, dy));
      }

      function spawnFx(clsName, gx, gy, text, life) {
        var node = el('div', { 'class': 'rb-pop ' + clsName, text: text || '' });
        node.style.left = ((gx + 0.5) / COLS * 100).toFixed(2) + '%';
        node.style.top = ((gy + 0.5) / ROWS * 100).toFixed(2) + '%';
        fxLayer.appendChild(node);
        setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, life || 420);
      }

      function bumpFx(nx, ny, dx, dy) {
        var cNode = cells[ny] && cells[ny][nx];
        if (cNode) {
          cNode.classList.remove('bumped');
          void cNode.offsetWidth;
          cNode.classList.add('bumped');
        }
        playerEl.style.setProperty('--bx', (dx * 16) + '%');
        playerEl.style.setProperty('--by', (dy * 16) + '%');
        playerEl.classList.remove('bumping');
        void playerEl.offsetWidth;
        playerEl.classList.add('bumping');
      }

      function updateExitDanger() {
        if (!exitCell) return;
        var dist = walkDist(st.robber.x, st.robber.y, EXIT.x, EXIT.y);
        exitCell.classList.toggle('danger', dist <= 3);
      }

      function clearHold() {
        clearTimeout(holdDelay);
        clearInterval(holdInt);
        holdDelay = 0;
        holdInt = 0;
      }

      function caught(msg) {
        clearTimeout(timer);
        clearHold();
        st.telegraphing = false;
        robberEl.classList.remove('juking');
        robberEl.classList.add('caught');
        grid.classList.add('rb-impact');
        spawnFx('rb-burst', st.robber.x, st.robber.y, '', 650);
        spawnFx('rb-tag rb-tag-ok', st.robber.x, st.robber.y, 'TACKLED!', 850);
        FM.audio.play('catch');
        ctx.pulse('good');
        ctx.win(msg);
      }

      /* only a HELD key (auto-repeat) is rate-limited; every deliberate press or tap always moves */
      function move(dx, dy, isRepeat) {
        var now = performance.now(), nx = st.player.x + dx, ny = st.player.y + dy, ox = st.player.x, oy = st.player.y;
        if (!ctx.live() || (isRepeat && now - lastMove < 78)) return;
        if (!open(nx, ny)) {
          if (!isRepeat) {
            FM.audio.play('bump');
            bumpFx(nx, ny, dx, dy);
          }
          return;
        }
        lastMove = now;
        spawnFx('rb-trail rb-trail-p', ox, oy, '', 260);
        st.player.x = nx;
        st.player.y = ny;
        place(playerEl, st.player, dx, dy);
        FM.audio.play('step');
        if (nx === st.robber.x && ny === st.robber.y) caught('Tackled! The frames are safe.');
      }
      st.move = move;

      /* checks if the player is standing in cross-aisle `col` between `fromY` and `toY` */
      function crossClear(col, fromY, toY) {
        var p = st.player, lo = Math.min(fromY, toY), hi = Math.max(fromY, toY);
        return !(p.x === col && p.y >= lo && p.y <= hi);
      }

      /* evaluates whether the player is guarding / closer to `aisle` than `otherAisle` */
      function aisleThreat(aisle) {
        var p = st.player, r = st.robber, other = aisle === TOP ? BOTTOM : TOP;
        var isTop = aisle === TOP;
        /* standing directly on the EXIT doorway does not block the robber */
        if (p.x === EXIT.x && p.y === EXIT.y) return false;
        /* player ahead in the same aisle or on that half of the floor ahead of the robber */
        if (p.x >= r.x && (isTop ? p.y < EXIT.y : p.y > EXIT.y)) return true;
        /* player can reach this aisle's exit bend faster than the other aisle's bend */
        var dCur = walkDist(p.x, p.y, EXIT.x, aisle);
        var dAlt = walkDist(p.x, p.y, EXIT.x, other);
        return dCur + 1 < dAlt;
      }

      function triggerJuke(newAisle, label, statusMsg, backtrackCol) {
        st.aisle = newAisle;
        st.feints--;
        st.jukesUsed++;
        st.jukeCooldown = 2;
        st.telegraphing = true;
        if (backtrackCol != null) st.backtrackTo = backtrackCol;
        robberEl.classList.add('juking');
        spawnFx('rb-ring', st.robber.x, st.robber.y, '', 520);
        spawnFx('rb-tag rb-tag-juke', st.robber.x, st.robber.y, label || 'JUKE!', 650);
        FM.audio.play('juke');
        ctx.status(statusMsg, 'bad');
        timer = setTimeout(function () {
          if (!ctx.live()) return;
          st.telegraphing = false;
          robberEl.classList.remove('juking');
          advanceRobber();
        }, telegraphMs);
      }

      /* decides if the robber should juke / feint before stepping; returns true if telegraph started */
      function evaluateJuke() {
        var r = st.robber, p = st.player, other = st.aisle === TOP ? BOTTOM : TOP;
        var playerCampingExit = (p.x === EXIT.x && p.y === EXIT.y);
        var onAisle = (r.y === TOP || r.y === BOTTOM);
        var inCross = (CROSS.indexOf(r.x) !== -1 && r.y > TOP && r.y < BOTTOM);
        var threatCur, threatOther;

        /* 1) Smart initial aisle pick at entrance before leaving (1,3) */
        if (!st.committed && r.x === ENTRANCE.x && r.y === ENTRANCE.y) {
          st.committed = true;
          if (!ctx.tutorial && ctx.d >= 0.3 && p.y !== EXIT.y) {
            st.aisle = p.y < EXIT.y ? BOTTOM : TOP;
          }
          return false;
        }

        if (st.feints <= 0 || st.backtrackTo !== null) return false;
        if (st.jukeCooldown > 0) return false;

        /* 2) Cross-aisle intersection (x = 4 or x = 7, on TOP or BOTTOM) */
        if (onAisle && r.y === st.aisle && CROSS.indexOf(r.x) !== -1) {
          if (!crossClear(r.x, r.y, other)) return false;
          threatCur = aisleThreat(st.aisle);
          threatOther = aisleThreat(other);

          /* blocked on current aisle while the other aisle is safer -> cut through cross-aisle */
          if (threatCur && !threatOther && Math.random() < U.lerp(0.82, 0.96, ctx.d)) {
            st.crossPivotCol = -1;
            triggerJuke(other, 'JUKE!', 'Juke! Robber cut through the cross-aisle to ' + (other === TOP ? 'top' : 'bottom') + '!');
            return true;
          }

          /* anti-exit-camp feint: player camping on (9,3) waiting to ambush the final tile;
             keep 1 feint in reserve on high-d so a last-second doorway pop-out gets juked too */
          if (playerCampingExit && ctx.d >= 0.45) {
            var hasSpare = st.feints >= 2 || (ctx.d < 0.6 && st.jukesUsed === 0);
            var campProb = r.x === 7 ? (hasSpare ? 0.92 : 0) : (hasSpare && ctx.d >= 0.6 ? 0.68 : 0);
            if (campProb > 0 && Math.random() < campProb) {
              st.crossPivotCol = -1;
              triggerJuke(other, 'JUKE!', 'Robber switched lanes at the rack to throw off your coverage!');
              return true;
            }
          }
        }

        /* 3) Mid-cross-aisle bait / counter-feint ("FAKE!"): player bit hard on the cut */
        if (inCross && ctx.d >= 0.6 && st.crossPivotCol !== r.x) {
          var destBlocked = (p.x === r.x && (st.aisle === TOP ? p.y < r.y : p.y > r.y)) ||
                            (p.x >= r.x && (st.aisle === TOP ? p.y <= 2 : p.y >= 4));
          var originClear = crossClear(r.x, r.y, other) && !aisleThreat(other);
          if (destBlocked && originClear && Math.random() < U.lerp(0.7, 0.92, ctx.d)) {
            st.crossPivotCol = r.x;
            triggerJuke(other, 'FAKE!', 'Fake-out! Robber pivoted back to the ' + (other === TOP ? 'top' : 'bottom') + ' aisle!');
            return true;
          }
        }

        /* 4) Rack-corner backtrack juke at high difficulty: player ambushes the exit column or blocks mid-aisle */
        if (onAisle && r.y === st.aisle && ctx.d >= 0.6) {
          /* 4a) Blocked near the exit approach (x=8 or x=9) by a player on the exit column -> duck back around rack 3 to x=7 */
          if ((r.x === 8 || r.x === 9) &&
              ((p.x === EXIT.x && (st.aisle === TOP ? p.y <= 2 : p.y >= 4)) || (r.x === 8 && p.x === 9 && p.y === r.y))) {
            var retreatClear = !(p.x === r.x - 1 && p.y === r.y) && !(p.x === 7 && p.y === r.y);
            if (retreatClear && crossClear(7, r.y, other)) {
              st.crossPivotCol = -1;
              triggerJuke(other, 'JUKE!', 'Robber spun back around the display rack toward ' + (other === TOP ? 'top' : 'bottom') + '!', 7);
              return true;
            }
          }
          /* 4b) Blocked head-on 2-3 tiles ahead right after x=4 (at x=5) on hard levels -> duck back 1 tile to x=4 */
          if (ctx.d >= 0.72 && r.x === 5 && p.y === r.y && p.x >= 7 && p.x <= 8) {
            if (!(p.x === 4 && p.y === r.y) && crossClear(4, r.y, other)) {
              st.crossPivotCol = -1;
              triggerJuke(other, 'JUKE!', 'Robber ducked back behind the rack to switch aisles!', 4);
              return true;
            }
          }
        }

        return false;
      }

      function advanceRobber() {
        var r = st.robber, p = st.player, ox = r.x, oy = r.y, dx = 0, dy = 0;
        if (!ctx.live()) return;
        if (st.jukeCooldown > 0) st.jukeCooldown--;

        if (st.backtrackTo !== null) {
          if (r.x > st.backtrackTo) {
            dx = -1;
          } else {
            st.backtrackTo = null;
            dy = st.aisle > r.y ? 1 : -1;
          }
        } else if (r.x === EXIT.x && r.y !== EXIT.y && (r.y !== st.aisle || st.backtrackTo === null)) {
          /* final sprint down/up the exit column (only if aligned with current target aisle) */
          if (r.y === st.aisle || (st.aisle === TOP && r.y < EXIT.y) || (st.aisle === BOTTOM && r.y > EXIT.y)) {
            dy = EXIT.y > r.y ? 1 : -1;
          } else {
            dy = st.aisle > r.y ? 1 : -1;
          }
        } else if (r.y === st.aisle) {
          dx = 1;
        } else {
          dy = st.aisle > r.y ? 1 : -1;
        }

        r.x += dx;
        r.y += dy;
        st.steps++;
        spawnFx('rb-trail rb-trail-r', ox, oy, '', 340);
        place(robberEl, r, dx, dy);
        updateExitDanger();

        if (r.x === EXIT.x && r.y === EXIT.y) {
          FM.audio.play('escape');
          grid.classList.add('rb-escaped');
          ctx.fail('The robber reached the exit with a tray of frames.');
          return;
        }
        if (r.x === p.x && r.y === p.y) {
          caught('The robber ran straight into you. Frames recovered.');
          return;
        }
        FM.audio.play('robberStep');
        timer = setTimeout(robberStep, st.stepMs);
      }

      function robberStep() {
        if (!ctx.live()) return;
        if (document.hidden) { timer = setTimeout(robberStep, 200); return; }   // the robber waits while the tab is hidden
        if (evaluateJuke()) return;
        advanceRobber();
      }

      function flashPad(dir) {
        var b = padBtns[dir];
        if (!b) return;
        b.classList.add('active');
        setTimeout(function () { b.classList.remove('active'); }, 110);
      }

      function onKey(e) {
        var k = e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key, v = KEYS[k];
        if (!v || e.ctrlKey || e.metaKey || e.altKey) return;
        e.preventDefault();
        flashPad(dirName(v[0], v[1]));
        move(v[0], v[1], e.repeat);
      }

      [['u', '▲', 0, -1, 'up', 'u'], ['l', '◀', -1, 0, 'left', 'l'], ['r', '▶', 1, 0, 'right', 'r'], ['d', '▼', 0, 1, 'down', 'd']].forEach(function (b) {
        var btn = el('button', { type: 'button', 'class': b[0], 'aria-label': 'Move ' + b[4], 'data-dir': b[4], text: b[1] });
        btn.addEventListener('pointerdown', function (e) {
          e.preventDefault();
          clearHold();
          btn.classList.add('active');
          move(b[2], b[3], false);
          holdDelay = setTimeout(function () {
            holdInt = setInterval(function () {
              if (!ctx.live()) { clearHold(); return; }
              move(b[2], b[3], true);
            }, 95);
          }, 210);
        });
        function stopPad() { btn.classList.remove('active'); clearHold(); }
        btn.addEventListener('pointerup', stopPad);
        btn.addEventListener('pointerleave', stopPad);
        btn.addEventListener('pointercancel', stopPad);
        btn.addEventListener('click', function (e) { if (e.detail === 0) move(b[2], b[3], false); });   // keyboard / assistive activation
        padBtns[b[5]] = btn;
        pad.appendChild(btn);
      });

      var legendItems = '<span><i style="background:#2ec4b6"></i>You</span><span><i style="background:#151515"></i>Robber</span>';
      if (maxFeints > 0) legendItems += '<span class="rb-agile">⚡ ' + maxFeints + ' juke' + (maxFeints > 1 ? 's' : '') + '</span>';

      ctx.root.appendChild(el('div', { 'class': 'rb-wrap' }, [
        grid,
        el('div', { 'class': 'rb-side' }, [
          el('div', { 'class': 'rb-legend', html: legendItems }),
          pad
        ])
      ]));
      place(robberEl, st.robber, 1, 0);
      place(playerEl, st.player, -1, 0);
      ctx.status(maxFeints >= 2 ? 'Watch the racks — this robber will juke!' : 'Watch which aisle they pick...');

      function onBlur() { clearHold(); }
      document.addEventListener('keydown', onKey);
      window.addEventListener('blur', onBlur);
      ctx.onCleanup(function () {
        document.removeEventListener('keydown', onKey);
        window.removeEventListener('blur', onBlur);
        clearTimeout(timer);
        clearHold();
      });
      timer = setTimeout(robberStep, 700);
    }
  });
})();
