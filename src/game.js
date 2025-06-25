
let currentPosition = [64, 64];

let keysHeld = {
    up: false,
    down: false,
    left: false,
    right: false
}

let currentCharacter = "reimu";
let currentAction = "stand";
let currentDirection = "up";

let attackInterval = 120;
let attackProgress = 0;
let attackSpeed = 60;

let speed = 1;

function keyPressed_GAME_MOVEMENT() {
    updateAction();
}

function keyReleased_GAME_MOVEMENT() {
    updateAction();
}

function updateAction() {
    keysHeld.up = keyIsDown(87) || keyIsDown(UP_ARROW);
    keysHeld.down = keyIsDown(83) || keyIsDown(DOWN_ARROW);
    keysHeld.left = keyIsDown(65) || keyIsDown(LEFT_ARROW);
    keysHeld.right = keyIsDown(68) || keyIsDown(RIGHT_ARROW);

    if (attackProgress < 30) {
        if (keysHeld.up) currentDirection = "up";
        else if (keysHeld.down) currentDirection = "down";
        else if (keysHeld.left) currentDirection = "left";
        else if (keysHeld.right) currentDirection = "right";

    }

    if (currentAction != "attack") {
        if (keysHeld.up) currentAction = "walk";
        else if (keysHeld.down) currentAction = "walk";
        else if (keysHeld.left) currentAction = "walk";
        else if (keysHeld.right) currentAction = "walk";
    }
}

function attack(value) {
    if (value == "start") {
        currentAction = "attack";
    } else if (value == "stop") {
        // currentAction = "stand";
        currentAction = "stand";
        updateAction();
    }
}

function draw_GAME() {
    frame++;

    // Animation
    if (frame % animationInterval == 0) {
        frameIndex++;
        frameIndex = frameIndex % 2;
    }

    // Attack
    if (frame % attackInterval == 0) {
        attack("start");
    }
    if (currentAction == "attack") {
        attackProgress++;
        if (attackProgress >= attackSpeed) {
            attackProgress = 0;
            frameIndexAttack = 0;
            attack("stop");
        }
        if (attackProgress == attackSpeed / 2) {
            frameIndexAttack++;
        }
    }

    if (keysHeld.up && keysHeld.left || keysHeld.up && keysHeld.right || keysHeld.down && keysHeld.left || keysHeld.down && keysHeld.right) {
        if (keysHeld.up && keysHeld.left) { currentPosition[1] -= speed / 1.414; currentPosition[0] -= speed / 1.414 }
        if (keysHeld.up && keysHeld.right) { currentPosition[1] -= speed / 1.414; currentPosition[0] += speed / 1.414 }
        if (keysHeld.down && keysHeld.left) { currentPosition[1] += speed / 1.414; currentPosition[0] -= speed / 1.414 }
        if (keysHeld.down && keysHeld.right) { currentPosition[1] += speed / 1.414; currentPosition[0] += speed / 1.414 }
    } else {
        if (keysHeld.up) currentPosition[1] -= speed;
        if (keysHeld.down) currentPosition[1] += speed;
        if (keysHeld.left) currentPosition[0] -= speed;
        if (keysHeld.right) currentPosition[0] += speed;
    }
}