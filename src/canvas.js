
//! Resize canvas

let resMulti = 1;
let mapMulti = 5;
let attackFrame = 0;
let frame = 0;
let frameIndex = {
    stand: 0,
    walk: 0,
    attack: 0,
    defend: 0,
    cast: 0
}
let animationInterval = 30;

let assets = {
    exp: {
        bar: [null, null]
    }
}

let characters = {
    reimu: {
        stand: {
            up: [null, null],
            down: [null, null],
            left: [null, null],
            right: [null, null]
        },
        walk: {
            up: [null, null, null, null],
            down: [null, null, null, null],
            left: [null, null, null, null],
            right: [null, null, null, null]
        },
        attack: {
            up: [null, null],
            down: [null, null],
            left: [null, null],
            right: [null, null]
        },
        defend: {
            up: null,
            down: null,
            left: null,
            right: null
        },
        cast: {
            up: [null, null],
            down: [null, null],
            left: [null, null],
            right: [null, null]
        },
        fall: {
            up: null,
            down: null,
            left: null,
            right: null
        }
    }
}

function changeResolution(width, height) {
    resMulti = width / 640;
    resizeCanvas(width, height, touhouCureApp);
}

//! Create canvas

function setup() {
    createCanvas(640, 360, touhouCureApp);
    colorMode(RGB, 255);
    noSmooth();
    textFont("Silkscreen");

    assets = {
        exp: {
            bar: [SPRITESHEET_MAIN.get(0, 0, 6, 6), SPRITESHEET_MAIN.get(6, 0, 6, 6)]
        }
    }

    characters = {
        reimu: {
            stand: {
                up: [SPRITESHEET_REIMU.get(0, 0, 64, 64), SPRITESHEET_REIMU.get(64, 0, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 64, 64, 64), SPRITESHEET_REIMU.get(64, 64, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 128, 64, 64), SPRITESHEET_REIMU.get(64, 128, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 192, 64, 64), SPRITESHEET_REIMU.get(64, 192, 64, 64)]
            },
            walk: {
                up: [SPRITESHEET_REIMU.get(0, 256, 64, 64), SPRITESHEET_REIMU.get(64, 256, 64, 64), SPRITESHEET_REIMU.get(128, 256, 64, 64), SPRITESHEET_REIMU.get(192, 256, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 320, 64, 64), SPRITESHEET_REIMU.get(64, 320, 64, 64), SPRITESHEET_REIMU.get(128, 320, 64, 64), SPRITESHEET_REIMU.get(192, 320, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 384, 64, 64), SPRITESHEET_REIMU.get(64, 384, 64, 64), SPRITESHEET_REIMU.get(128, 384, 64, 64), SPRITESHEET_REIMU.get(192, 384, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 448, 64, 64), SPRITESHEET_REIMU.get(64, 448, 64, 64), SPRITESHEET_REIMU.get(128, 448, 64, 64), SPRITESHEET_REIMU.get(192, 448, 64, 64)]
            },
            attack: {
                up: [SPRITESHEET_REIMU.get(0, 512, 64, 64), SPRITESHEET_REIMU.get(64, 512, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 576, 64, 64), SPRITESHEET_REIMU.get(64, 576, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 640, 64, 64), SPRITESHEET_REIMU.get(64, 640, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 704, 64, 64), SPRITESHEET_REIMU.get(64, 704, 64, 64)]
            },
            defend: {
                up: [SPRITESHEET_REIMU.get(0, 768, 64, 64), SPRITESHEET_REIMU.get(0, 768, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 832, 64, 64), SPRITESHEET_REIMU.get(0, 832, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 896, 64, 64), SPRITESHEET_REIMU.get(0, 896, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 960, 64, 64), SPRITESHEET_REIMU.get(0, 960, 64, 64)],
            },
            cast: {
                up: [SPRITESHEET_REIMU.get(0, 1024, 64, 64), SPRITESHEET_REIMU.get(64, 1024, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 1088, 64, 64), SPRITESHEET_REIMU.get(64, 1088, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 1152, 64, 64), SPRITESHEET_REIMU.get(64, 1152, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 1216, 64, 64), SPRITESHEET_REIMU.get(64, 1216, 64, 64)],
            },
            fall: {
                up: SPRITESHEET_REIMU.get(0, 1280, 64, 64),
                down: SPRITESHEET_REIMU.get(0, 1344, 64, 64),
                left: SPRITESHEET_REIMU.get(0, 1408, 64, 64),
                right: SPRITESHEET_REIMU.get(0, 1472, 64, 64)
            }
        },
        marisa: {
            stand: {
                up: [SPRITESHEET_MARISA.get(0, 0, 64, 64), SPRITESHEET_MARISA.get(64, 0, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 64, 64, 64), SPRITESHEET_MARISA.get(64, 64, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 128, 64, 64), SPRITESHEET_MARISA.get(64, 128, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 192, 64, 64), SPRITESHEET_MARISA.get(64, 192, 64, 64)]
            },
            walk: {
                up: [SPRITESHEET_MARISA.get(0, 256, 64, 64), SPRITESHEET_MARISA.get(64, 256, 64, 64), SPRITESHEET_MARISA.get(128, 256, 64, 64), SPRITESHEET_MARISA.get(192, 256, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 320, 64, 64), SPRITESHEET_MARISA.get(64, 320, 64, 64), SPRITESHEET_MARISA.get(128, 320, 64, 64), SPRITESHEET_MARISA.get(192, 320, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 384, 64, 64), SPRITESHEET_MARISA.get(64, 384, 64, 64), SPRITESHEET_MARISA.get(128, 384, 64, 64), SPRITESHEET_MARISA.get(192, 384, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 448, 64, 64), SPRITESHEET_MARISA.get(64, 448, 64, 64), SPRITESHEET_MARISA.get(128, 448, 64, 64), SPRITESHEET_MARISA.get(192, 448, 64, 64)]
            },
            attack: {
                up: [SPRITESHEET_MARISA.get(0, 512, 64, 64), SPRITESHEET_MARISA.get(64, 512, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 576, 64, 64), SPRITESHEET_MARISA.get(64, 576, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 640, 64, 64), SPRITESHEET_MARISA.get(64, 640, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 704, 64, 64), SPRITESHEET_MARISA.get(64, 704, 64, 64)]
            },
            defend: {
                up: [SPRITESHEET_MARISA.get(0, 768, 64, 64), SPRITESHEET_MARISA.get(0, 768, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 832, 64, 64), SPRITESHEET_MARISA.get(0, 832, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 896, 64, 64), SPRITESHEET_MARISA.get(0, 896, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 960, 64, 64), SPRITESHEET_MARISA.get(0, 960, 64, 64)],
            },
            cast: {
                up: [SPRITESHEET_MARISA.get(0, 1024, 64, 64), SPRITESHEET_MARISA.get(64, 1024, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 1088, 64, 64), SPRITESHEET_MARISA.get(64, 1088, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 1152, 64, 64), SPRITESHEET_MARISA.get(64, 1152, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 1216, 64, 64), SPRITESHEET_MARISA.get(64, 1216, 64, 64)],
            },
            fall: {
                up: SPRITESHEET_MARISA.get(0, 1280, 64, 64),
                down: SPRITESHEET_MARISA.get(0, 1344, 64, 64),
                left: SPRITESHEET_MARISA.get(0, 1408, 64, 64),
                right: SPRITESHEET_MARISA.get(0, 1472, 64, 64)
            }
        },
        flandre: {
            stand: {
                up: [SPRITESHEET_FLANDRE.get(0, 0, 64, 64), SPRITESHEET_FLANDRE.get(64, 0, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 64, 64, 64), SPRITESHEET_FLANDRE.get(64, 64, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 128, 64, 64), SPRITESHEET_FLANDRE.get(64, 128, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 192, 64, 64), SPRITESHEET_FLANDRE.get(64, 192, 64, 64)]
            },
            walk: {
                up: [SPRITESHEET_FLANDRE.get(0, 256, 64, 64), SPRITESHEET_FLANDRE.get(64, 256, 64, 64), SPRITESHEET_FLANDRE.get(128, 256, 64, 64), SPRITESHEET_FLANDRE.get(192, 256, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 320, 64, 64), SPRITESHEET_FLANDRE.get(64, 320, 64, 64), SPRITESHEET_FLANDRE.get(128, 320, 64, 64), SPRITESHEET_FLANDRE.get(192, 320, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 384, 64, 64), SPRITESHEET_FLANDRE.get(64, 384, 64, 64), SPRITESHEET_FLANDRE.get(128, 384, 64, 64), SPRITESHEET_FLANDRE.get(192, 384, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 448, 64, 64), SPRITESHEET_FLANDRE.get(64, 448, 64, 64), SPRITESHEET_FLANDRE.get(128, 448, 64, 64), SPRITESHEET_FLANDRE.get(192, 448, 64, 64)]
            },
            attack: {
                up: [SPRITESHEET_FLANDRE.get(0, 512, 64, 64), SPRITESHEET_FLANDRE.get(64, 512, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 576, 64, 64), SPRITESHEET_FLANDRE.get(64, 576, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 640, 64, 64), SPRITESHEET_FLANDRE.get(64, 640, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 704, 64, 64), SPRITESHEET_FLANDRE.get(64, 704, 64, 64)]
            },
            defend: {
                up: [SPRITESHEET_FLANDRE.get(0, 768, 64, 64), SPRITESHEET_FLANDRE.get(0, 768, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 832, 64, 64), SPRITESHEET_FLANDRE.get(0, 832, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 896, 64, 64), SPRITESHEET_FLANDRE.get(0, 896, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 960, 64, 64), SPRITESHEET_FLANDRE.get(0, 960, 64, 64)],
            },
            cast: {
                up: [SPRITESHEET_FLANDRE.get(0, 1024, 64, 64), SPRITESHEET_FLANDRE.get(64, 1024, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 1088, 64, 64), SPRITESHEET_FLANDRE.get(64, 1088, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 1152, 64, 64), SPRITESHEET_FLANDRE.get(64, 1152, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 1216, 64, 64), SPRITESHEET_FLANDRE.get(64, 1216, 64, 64)],
            },
            fall: {
                up: SPRITESHEET_FLANDRE.get(0, 1280, 64, 64),
                down: SPRITESHEET_FLANDRE.get(0, 1344, 64, 64),
                left: SPRITESHEET_FLANDRE.get(0, 1408, 64, 64),
                right: SPRITESHEET_FLANDRE.get(0, 1472, 64, 64)
            }
        }
    }
}

function draw_CANVAS() {
    background(32, 32, 32);

    // Map
    image(
        MAP,
        width / 2 - currentPosition[0] * resMulti,
        height / 2 - currentPosition[1] * resMulti,
        640 * mapMulti * resMulti,
        360 * mapMulti * resMulti
    );

    console.log(currentAction);

    let ctx = drawingContext;

    // EXP bar background
    let backgroundGradient = ctx.createLinearGradient(0, 0, 640 * resMulti, 0);
    backgroundGradient.addColorStop(0, 'rgba(85, 194, 215, 0.5)');
    backgroundGradient.addColorStop(1, 'rgba(94, 221, 238, 0.5)');
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, 640 * resMulti, 8 * resMulti);
    ctx.beginPath();
    ctx.moveTo(560 * resMulti, 8 * resMulti);
    ctx.lineTo(565 * resMulti, 16 * resMulti);
    ctx.lineTo(640 * resMulti, 16 * resMulti);
    ctx.lineTo(640 * resMulti, 8 * resMulti);
    ctx.closePath();
    ctx.fill();

    // EXP bar progress
    let foregroundGradient = ctx.createLinearGradient(0, 0, 640 * resMulti, 0);
    foregroundGradient.addColorStop(0, 'rgba(85, 194, 215)');
    foregroundGradient.addColorStop(1, 'rgba(94, 221, 238)');
    ctx.fillStyle = foregroundGradient;
    ctx.fillRect(0, 0, levelProgress * 6.4 * resMulti, 8 * resMulti);
    if (levelProgress * 6.4 >= 560) {
        ctx.beginPath();
        ctx.moveTo(560 * resMulti, 8 * resMulti);
        ctx.lineTo(565 * resMulti, 16 * resMulti);
        ctx.lineTo(565 * resMulti + levelProgress * 6.4 * resMulti - 565 * resMulti, 16 * resMulti);
        ctx.lineTo(565 * resMulti + levelProgress * 6.4 * resMulti - 565 * resMulti, 8 * resMulti);
        ctx.closePath();
        ctx.fill();
    }

    // EXP bar outline
    strokeWeight(3 * resMulti);
    line(0, 8 * resMulti, 560 * resMulti, 8 * resMulti);
    line(560 * resMulti, 8 * resMulti, 565 * resMulti, 16 * resMulti);
    line(565 * resMulti, 16 * resMulti, 640 * resMulti, 16 * resMulti);

    // Level text
    textSize(12 * resMulti);
    fill(255, 255, 255);
    text(`Lvl. ${level}`, 570 * resMulti, 12 * resMulti);

    // Maid picture
    strokeWeight(0);
    rect(6 * resMulti, 16 * resMulti, 48 * resMulti, 48 * resMulti);

    // Health bar
    fill(255, 0, 0);
    rect(58 * resMulti, 16 * resMulti, 96 * resMulti, 6 * resMulti);
    fill(0, 255, 0);
    rect(58 * resMulti, 16 * resMulti, Math.ceil(health / maxhealth * 96) * resMulti, 6 * resMulti);
    textSize(6 * resMulti);
    fill(0, 0, 0);
    text(`${health}/${maxhealth}`, 60 * resMulti, 21 * resMulti);

    // Inventory
    fill(255, 255, 255);
    for (let i = 0; i < inventory.weapons.length; i++) {
        square(
            58 * resMulti + 20 * resMulti * i,
            26 * resMulti,
            16 * resMulti
        )
    }
    for (let i = 0; i < inventory.items.length; i++) {
        square(
            58 * resMulti + 20 * resMulti * i,
            48 * resMulti,
            16 * resMulti
        )
    }

    // Special bar
    fill(0, 0, 0);
    rect(6 * resMulti, 67 * resMulti, 48 * resMulti, 3 * resMulti);
    fill(255, 255, 255);
    rect(6 * resMulti, 67 * resMulti, ((specialProgress / 60) / specialCooldown) * 48 * resMulti, 3 * resMulti);

    fill(0, 255, 0);
    if (currentAction == "attack") {
        square(640 / 2 * resMulti, 360 / 2 * resMulti, 64 * resMulti);
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex.attack], 640 / 2 * resMulti, 360 / 2 * resMulti, 64 * resMulti, 64 * resMulti);
    } else if (currentAction == "cast") {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex.cast], 640 / 2 * resMulti, 360 / 2 * resMulti, 64 * resMulti, 64 * resMulti);
    } else if (currentAction == "walk") {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex.walk], 640 / 2 * resMulti, 360 / 2 * resMulti, 64 * resMulti, 64 * resMulti);
    } else if (currentAction == "stand") {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex.stand], 640 / 2 * resMulti, 360 / 2 * resMulti, 64 * resMulti, 64 * resMulti);
    } else if (currentAction == "fall") {
        image(characters[currentCharacter][currentAction][currentDirection], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    }
}