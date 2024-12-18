kaboom({
    global: true,
    fullscreen: true,
    scale: 3,
    debug: true,
    clearColor: [1, 0, 0],
    backgroundAudio: true,
  });
  
  // Speed identifiers
  const MOVE_SPEED = 120;
  const JUMP_FORCE = 360;
  const BIG_JUMP_FORCE = 550;
  let CURRENT_JUMP_FORCE = JUMP_FORCE;
  const FALL_DEATH = 460;
  const ENEMY_SPEED = 20;
  
  const SLICER_SPEED = 100;
  const SKELETOR_SPEED = 60;
  
  // Load Sprites
  loadRoot('https://i.imgur.com/');
  loadSprite('mushroom', 'pzU0qoW.gif');
  loadSprite('coin', '/IaEYlzh.png');
  loadSprite('2-top-left', '/0fOOkok.png');
  loadSprite('2-top-right', '/fovDvKp.png');
  loadSprite('WBC-going-left', 'pw4C08u.png');
  loadSprite('WBC-going-right', 'ftpM2dK.png');
  loadSprite('2-bottom-left', 'c1cYSbt.png');
  loadSprite('2-bottom-right', 'nqQ79eI.png');
  loadSprite('evil-shroom', 'lOhgTzW.gif');
  loadSprite('virus', 'lOhgTzW.gif');
  loadSprite('brick', '/4cLeqWv.png');
  loadSprite('block', '/EBJ3qCL.png');
  loadSprite('block2', '/EBJ3qCL.png');
  loadSprite('WBC', '/AiRF3GI.png');
  loadSprite('WBC2', '/jixNMRZ.png');
  loadSprite('kaboom2', '/L2QzPUQ.png');
  loadSprite('bg2', '3SIAnNb.png');
  loadSprite('bg3', '/4dfLkTd.png');
  loadSprite('virus2', '2Kfebjj.png');
  loadSprite('virus1', 'IjRMvZ6.png');
  loadSprite('testing', 'oWqiTDZ.png');
  loadSprite('testingw', '/erv89Xu.png');
  loadSprite('testing3', 'oWqiTDZ.png');
  loadSprite('left-wall', 'rfDoaa1.png');
  loadSprite('top-wall', 'QA257Bj.png');
  loadSprite('bottom-wall', 'vWJWmvb.png');
  loadSprite('right-wall', 'SmHhgUn.png');
  loadSprite('bottom-left-wall', 'awnTfNC.png');
  loadSprite('bottom-right-wall', '84oyTFy.png');
  loadSprite('top-left-wall', 'xlpUxIm.png');
  loadSprite('top-right-wall', 'z0OmBd1.jpg');
  loadSprite('top-door', 'U9nre4n.png');
  loadSprite('fire-pot', 'xpm3bRa.png');
  loadSprite('left-door', 'okdJNls.png');
  loadSprite('lanterns', 'wiSiY09.png');
  loadSprite('slicer', 'kEPti7g.png');
  loadSprite('skeletor', 'Ei1VnX8.png');
  loadSprite('kaboom', '/QSnbWyw.png');
  loadSprite('stairs', 'VghkL08.png');
  loadSprite('Etest', 'LGGBhuF.png');
  
  // Title Scene
  scene('title', () => {
    layers(['bg2', 'obj'], 'obj');
  
    add([
      sprite('bg2'),
      layer('bg2'),
      origin('center'),
      pos(width() / 2, height() / 2),
      scale(0.8),
    ]);
  
    add([
      // Draw the "stroke" first (black color with offset)
      text('Through the Portal', 30),
      origin('center'),
      pos(width() / 2 + 2, height() / 3 + 2), // Slightly offset for the stroke effect
      color(0, 0, 0), // Stroke color (black)
      scale(0.8), // Same scale for stroke
  ]);
  
  // Draw the main text on top
  add([
      text('Through the Portal', 30),
      origin('center'),
      pos(width() / 2, height() / 3), // Same position as the original text
      color(0, 0, 1), // Main text color (blue)
      scale(0.8), // Same scale for the main text
  ]);
  
    add([
      text('Press the button to play', 14),
      origin('center'),
      pos(width() / 2 + 2, height() / 2  + 2),
      color(0, 0, 0), // Stroke color (black)
    ]);
  
    
    add([
      text('Press the button to play', 14),
      origin('center'),
      pos(width() / 2, height() / 2),
      color(1, 0, 0),
    ]);
  
    keyPress('space', () => {
    });
    
  });
  
  // Start with the title screen
  start('title');
  
  // Game Scene
  scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');
  
    const maps = [
      [
        '                                                                                           ',
        '                                          ---  %-- ---%-        ===========                ',
        '                                                                                           ',
        '                                        ====================                                ',
        '     %   ---%-       ---%-                                                               i   ',
        '                                      ==                        ========                    ',
        '               .    _    .   _   .         .  .                           ========          ',
        '==============================   ===                                                        ',
      ],
    ];
  
    const levelCfg = {
      width: 20,
      height: 20,
      '=': [sprite('block'), solid(), scale(0.9)],
      '-': [sprite('block2'), solid(), scale(0.9)],
      '$': [sprite('coin'), 'coin', scale(0.7)],
      '%': [sprite('surprise'), solid(), scale(0.9), 'coin-surprise'],
      '*': [sprite('surprise'), solid(), scale(0.9), 'mushroom-surprise'],
      '}': [sprite('unboxed'), solid(), scale(0.9)],
      '_': [sprite('virus1'), solid(), scale(0.3), 'dangerous'],
      '.': [sprite('evil-shroom'), solid(), scale(0.3), 'dangerous'],
      '#': [sprite('mushroom'), solid(), 'mushroom', body(), scale(0.6)],
      '9': [sprite('virus2'), solid(), 'virus2', body(), scale(0.6), 'dangerous'],
      'q': [sprite('virus'), solid(), 'virus', body(), scale(0.6), 'dangerous'],
      'F': [sprite('testing'), solid(), 'testing', body(), scale(2), 'pipe'],
      'i': [sprite('testingw'), 'testing', scale(1), 'bmw'],
    };
  
    add([sprite('bg'), layer('bg'), pos(-200, -300), scale(1)]);
    add([sprite('bg'), layer('bg'), pos(900, -500), scale(1)]);
  
    const gameLevel = addLevel(maps[level], levelCfg);
  
    const scoreLabel = add([
      text(score),
      pos(40, 6),
      layer('ui'),
      {
        value: score,
      },
    ]);
  
    add([text('level ' + parseInt(level + 1)), pos(40, 6)]);
  
    function big() {
      let timer = 0;
      let isBig = false;
      return {
        update() {
          if (isBig) {
            CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
            timer -= dt();
            if (timer <= 0) {
              this.smallify();
            }
          }
        },
        isBig() {
          return isBig;
        },
        smallify() {
          this.scale = vec2(1);
          CURRENT_JUMP_FORCE = JUMP_FORCE;
          timer = 0;
          isBig = false;
        },
        biggify(time) {
          this.scale = vec2(2);
          timer = time;
          isBig = true;
        },
      };
    }
  
    const player = add([
      sprite('WBC'),
      solid(),
      pos(60, 0),
      body(),
      big(),
      origin('bot'),
      scale(0.7),
    ]);
  
    const player2 = add([
      sprite('WBC2'),
      solid(),
      pos(60, 0),
      body(),
      big(),
      origin('bot'),
      scale(0.04),
    ]);
  
    action('virus2', (m) => {
      m.move(20, 0);
    });
  
    player.collides('virus2', (m) => {
      if (isJumping) {
        destroy(m);
        player.biggify(6);
      } else {
        go('lose', { score: scoreLabel.value });
      }
    });
  
    player.collides('bmw', () => {
      window.location.href = 'game2.html';
    });
  
    action('mushroom', (m) => {
      m.move(20, 0);
    });
  
    player.on('headbump', (obj) => {
      if (obj.is('coin-surprise')) {
        gameLevel.spawn('$', obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn('}', obj.gridPos.sub(0, 0));
      }
      if (obj.is('mushroom-surprise')) {
        gameLevel.spawn('#', obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn('}', obj.gridPos.sub(0, 0));
      }
    });
  
    player.collides('mushroom', (m) => {
      destroy(m);
      player.biggify(6);
    });
  
    player.collides('coin', (c) => {
      destroy(c);
      scoreLabel.value++;
      scoreLabel.text = scoreLabel.value;
    });
  
    action('dangerous', (d) => {
      d.move(-ENEMY_SPEED, 0);
    });
  
    player.collides('dangerous', (d) => {
      if (isJumping) {
        destroy(d);
      } else {
        go('lose', { score: scoreLabel.value });
      }
    });
  
    player.action(() => {
      camPos(player.pos);
      if (player.pos.y >= FALL_DEATH) {
        go('lose', { score: scoreLabel.value });
      }
    });
  
    keyDown('left', () => {
      player.move(-MOVE_SPEED, 0);
      player2.move(-MOVE_SPEED, 0);
    });
  
    keyDown('right', () => {
      player.move(MOVE_SPEED, 0);
      player2.move(MOVE_SPEED, 0);
    });
  
    keyDown('up', () => {
      if (player.grounded()) {
        player.jump(CURRENT_JUMP_FORCE);
      }
    });
  
    keyPress('down', () => {
      if (player.grounded()) {
        player.shoot();
      }
    });
  });
  
  // Lose Scene
  scene('lose', ({ score }) => {
    layers(['bg', 'obj'], 'obj');
  
    add([sprite('kaboom'), pos(width() / 2, height() / 2), origin('center'), scale(1.5)]);
  
    add([text('You Lost!', { size: 32 }), pos(width() / 2, height() / 4), origin('center')]);
  
    add([text('Your Score: ' + score, { size: 24 }), pos(width() / 2, height() / 2), origin('center')]);
  
    add([text('Press SPACE to Restart', { size: 18 }), pos(width() / 2, height() / 1.5), origin('center')]);
  
    keyPress('space', () => {
      go('game', { level: 0, score: 0 });
    });
  });
  