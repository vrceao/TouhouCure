
let currentPosition = [320 * resMulti, 180 * resMulti];

let keysHeld = {
    up: false,
    down: false,
    left: false,
    right: false
}

let currentCharacter = "reimu";
let currentAction = "stand";
let currentDirection = "up";

let attackInterval = 150;
let attackProgress = 0;
let attackSpeed = 60;

let speed = 1;

let maxhealth = 10;
let health = 8;

let inventory = {
    weapons: [
        null,
        null,
        null,
        null,
        null
    ],
    items: [
        null,
        null,
        null,
        null,
        null
    ]
}

let level = 0;
let exp = 0;
let neededExp = 10;
let levelProgress = 0;

let castingProgress = 0;
let casting = false;

function maidDied() {
    currentAction = "fall";
}

function decreaseHealth(value) {
    health--;
    if (health < 0) health = 0;
    if (health == 0) maidDied();
}

function increaseEXP(value) {
    exp += value;
    levelProgress = exp * 100 / neededExp;

    if (levelProgress >= 100) {
        exp -= neededExp;
        levelProgress = exp * 100 / neededExp;
        neededExp = Math.ceil(neededExp * 1.1);
        level++;
    }
}

function keyPressed_GAME_MOVEMENT() {
    if (key == "f" && currentAction != "attack" && !casting ) {
        casting = true;
    }

    if (key == "h") increaseEXP(1);

    if (key == "j") decreaseHealth(1);

    if (key == "g") {
        if (currentCharacter == "reimu") currentCharacter = "marisa";
        else if (currentCharacter == "marisa") currentCharacter = "flandre";
        else currentCharacter = "reimu";
    }

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

    if (currentAction == "stand" && attackProgress < 30 || currentAction == "walk" && attackProgress < 30) {
        if (keysHeld.up) currentDirection = "up";
        else if (keysHeld.down) currentDirection = "down";
        else if (keysHeld.left) currentDirection = "left";
        else if (keysHeld.right) currentDirection = "right";
    }

    if (currentAction == "attack" && currentAction == "walk") {
        currentAction = "stand";
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

function cast(value) {
    if (value == "start") {
        attackFrame = Math.round(Math.floor(attackFrame / attackInterval)) * attackInterval;
        currentAction = "cast";
    } else if (value == "stop") {
        currentAction = "stand";
        casting = false;
        updateAction();
    }
}

function draw_GAME() {
    frame++;
    attackFrame++;

    // Animation - stand
    if (frame % animationInterval == 0) {
        frameIndex.stand++;
        frameIndex.stand = frameIndex.stand % 2;
    }

    // Animation - walk
    if (frame % animationInterval == 0) {
        frameIndex.walk++;
        frameIndex.walk = frameIndex.walk % 4;
    }

    // Attack
    if (attackFrame % attackInterval == 0 && currentAction != "fall") {
        attack("start");
    }
    if (currentAction == "attack") {
        attackProgress++;
        if (attackProgress >= attackSpeed) {
            attackProgress = 0;
            frameIndex.attack = 0;
            attack("stop");
        }
        if (attackProgress == attackSpeed / 2) {
            frameIndex.attack++;
        }
    }

    // Cast
    if (casting) {
        if (castingProgress == 0) cast("start");
        castingProgress++;
        if (castingProgress >= 60) {
            castingProgress = 0;
            frameIndex.cast = 0;
            cast("stop");
        }
        if (castingProgress == 60 / 2) {
            frameIndex.cast++;
        }
    }

    if (currentAction != "cast" && currentAction != "fall") {
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
}