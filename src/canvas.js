
//! Resize canvas

let resMulti = 1;
let attackFrame = 0;
let frame = 0;
let frameIndex = 0;
let frameIndexAttack = 0;
let frameIndexCast = 0;
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
    createCanvas(1280, 720, touhouCureApp);
    colorMode(RGB, 255);
    noSmooth();
    textFont("Inter");
    textStyle(BOLD)

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
                up: [SPRITESHEET_REIMU.get(0, 1280, 64, 64), SPRITESHEET_REIMU.get(0, 1280, 64, 64)],
                down: [SPRITESHEET_REIMU.get(0, 1344, 64, 64), SPRITESHEET_REIMU.get(0, 1344, 64, 64)],
                left: [SPRITESHEET_REIMU.get(0, 1408, 64, 64), SPRITESHEET_REIMU.get(0, 1408, 64, 64)],
                right: [SPRITESHEET_REIMU.get(0, 1472, 64, 64), SPRITESHEET_REIMU.get(0, 1472, 64, 64)],
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
                up: [SPRITESHEET_MARISA.get(0, 1280, 64, 64), SPRITESHEET_MARISA.get(0, 1280, 64, 64)],
                down: [SPRITESHEET_MARISA.get(0, 1344, 64, 64), SPRITESHEET_MARISA.get(0, 1344, 64, 64)],
                left: [SPRITESHEET_MARISA.get(0, 1408, 64, 64), SPRITESHEET_MARISA.get(0, 1408, 64, 64)],
                right: [SPRITESHEET_MARISA.get(0, 1472, 64, 64), SPRITESHEET_MARISA.get(0, 1472, 64, 64)],
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
                up: [SPRITESHEET_FLANDRE.get(0, 1280, 64, 64), SPRITESHEET_FLANDRE.get(0, 1280, 64, 64)],
                down: [SPRITESHEET_FLANDRE.get(0, 1344, 64, 64), SPRITESHEET_FLANDRE.get(0, 1344, 64, 64)],
                left: [SPRITESHEET_FLANDRE.get(0, 1408, 64, 64), SPRITESHEET_FLANDRE.get(0, 1408, 64, 64)],
                right: [SPRITESHEET_FLANDRE.get(0, 1472, 64, 64), SPRITESHEET_FLANDRE.get(0, 1472, 64, 64)],
            }
        }
    }
}

function draw_CANVAS() {
    background(32, 32, 32);
    textSize(10 * resMulti);
    strokeWeight(0);

    // GREEN
    for (let i = 0; i < Math.floor(levelProgress); i++) {
        image(assets.exp.bar[1], 4 * resMulti +
            // 6 * 10 * resMulti +
            6 * i * resMulti, 4 * resMulti, 6 * resMulti, 6 * resMulti);
    }
    // RED
    for (let i = 0; i < 100 - Math.floor(levelProgress); i++) {
        image(assets.exp.bar[0], 4 * resMulti +
            Math.floor(levelProgress) * 6 * resMulti +
            // 6 * 10 * resMulti +
            6 * i * resMulti, 4 * resMulti, 6 * resMulti, 6 * resMulti);
    }

    text(`Lvl ${level}`, 608 * resMulti, 10 * resMulti);

    fill(0, 255, 0);
    if (currentAction == "attack") {
        square(currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti);
        image(characters[currentCharacter][currentAction][currentDirection][frameIndexAttack], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    } else if (currentAction == "cast") {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndexCast], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    } else {
        image(characters[currentCharacter][currentAction][currentDirection][frameIndex], currentPosition[0] * resMulti - 32 * resMulti, currentPosition[1] * resMulti - 32 * resMulti, 64 * resMulti, 64 * resMulti);
    }
}