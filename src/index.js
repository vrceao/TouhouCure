
//! Segments
//? Changable variables
// Comments

onload = function() {
    changeOverlaySelected(0);

    //? Change the resolution to x2.00 on page load (uncomment lines below)
    changeResolution(1280, 720);
}

let SPRITESHEET_MAIN;
let SPRITESHEET_REIMU;
let SPRITESHEET_MARISA;
let SPRITESHEET_FLANDRE;

function preload() {
    SPRITESHEET_MAIN = loadImage("assets/spritesheet_main.png");
    SPRITESHEET_REIMU = loadImage("assets/spritesheet_reimu.png");
    SPRITESHEET_MARISA = loadImage("assets/spritesheet_marisa.png");
    SPRITESHEET_FLANDRE = loadImage("assets/spritesheet_flandre.png");
}

function draw() {
    draw_GAME();
    draw_CANVAS();
}

function keyPressed() {
    keyPressed_OVERLAY_VISIBILITY();
    keyPressed_OVERLAY_NAVIGATION();

    if (!overlayVisible) {
        keyPressed_GAME_MOVEMENT();
    }
}

function keyReleased() {
    keyReleased_OVERLAY_VISIBILITY();

    if (!overlayVisible) {
        keyReleased_GAME_MOVEMENT();
    }
}