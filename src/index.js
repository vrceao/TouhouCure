
//! Segments
//? Changable variables
// Comments

onload = function() {
    changeOverlaySelected(0);
}

let SPRITESHEET_REIMU;

function preload() {
    SPRITESHEET_REIMU = loadImage("assets/spritesheet_reimu.png");
}

function draw() {
    draw_GAME();
    draw_CANVAS()
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