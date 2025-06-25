
//! Resize canvas

let resMulti = 1;
let frame = 0;
let frameIndex = 0;
let frameIndexAttack = 0;
let animationInterval = 30;

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
            }
        }
    }
}

function draw_CANVAS() {
    background(32, 32, 32);
    if (currentAction == "attack") {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndexAttack], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    } else {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    }
}