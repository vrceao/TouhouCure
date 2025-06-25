
//! Customizable variables

//? Changes the amount of time you need to hold the key for to show the overlay (ms)
let escapeHoldDuration = 500;

//! Detecting for escape being held

let escapeHeld = false;
let timerValue = 0;
let timerID = null;

function increaseTimer() {
    timerValue++;
    if (timerValue >= Math.round(escapeHoldDuration / 10)) {
        clearInterval(timerID);
        timerValue = 0;
        escapeHeld = false;
        overlayVisibility(1);
        console.log(`Q/Escape has been held for ${escapeHoldDuration}ms. Overlay enabled`);
    }
}

function keyPressed_OVERLAY_VISIBILITY() {
    if (overlayVisible) {
        if (key == "Escape" || key == "q" || key == "Q") overlayVisibility(0);
    }
    if (escapeHeld == false) {
        if (key == "Escape" || key == "q" || key == "Q") {
            escapeHeld = true;
            timerID = setInterval(increaseTimer, 10);
        }
    }
}

function keyReleased_OVERLAY_VISIBILITY() {
    if (escapeHeld == true) {
        if (key == "Escape" || key == "q" || key == "Q") {
            clearInterval(timerID);
            escapeHeld = false;
            console.log(`Q/Escape has been released after ${timerValue * 10}/${escapeHoldDuration}ms. Cancelled.`);
            timerValue = 0;
        }
    }
}

//! Showing and hiding

const overlayDiv =  document.getElementsByClassName("overlay");
const touhouCureApp = document.getElementById("touhouCureApp");

let overlayVisible = false;

function overlayVisibility(value) {
    if (value == 1) {
        overlayVisible = true;
        for (let i = 0; i < overlayDiv.length; i++) {
            overlayDiv[i].style.opacity = "100%";
        }
        for (let i = 0; i < overlayOptions.length; i++) {
            overlayOptions[i].textContent = overlayValues[i][(overlayValue2[i])]
            overlayValue[i] = overlayValue2[i];
        }
    } else if (value == 0) {
        overlayVisible = false;
        for (let i = 0; i < overlayDiv.length; i++) {
            overlayDiv[i].style.opacity = "0%";
        }
    }
}

//! Navigating options

const overlayOptions = document.getElementsByClassName("overlay-option");

const overlayValues = [
    ["2560x1440 (x4.00)", "1920x1080 (x3.00)", "1280x720 (x2.00)", "640x360 (x1.00)"]
];
let overlayValue = [3, 0];
let overlayValue2 = [3, 0];
let overlaySelected = 0;

function changeOverlaySelected(value) {
    overlaySelected += value;

    if (overlaySelected == overlayOptions.length) overlaySelected--;
    else if (overlaySelected < 0) overlaySelected++;

    for (let i = 0; i < overlayOptions.length; i++) {
        overlayOptions[i].style.background = "";
    }

    overlayOptions[overlaySelected].style.background = "#1a5eb2";
}

function changeOverlayValue(value) {
    overlayValue[overlaySelected] += value;

    if (overlayValue[overlaySelected] == overlayValues[overlaySelected].length) overlayValue[overlaySelected]--;
    else if (overlayValue[overlaySelected] < 0) overlayValue[overlaySelected]++;

    overlayOptions[overlaySelected].textContent = overlayValues[overlaySelected][(overlayValue[overlaySelected])];
    console.log(overlayValue);
}

function overlayConfirm() {
    for (let i = 0; i < overlayValue2.length; i++) {
        overlayValue2[i] = overlayValue[i];
    }

    switch (overlaySelected) {
        case 0: // Resolution
            changeResolution(
                (overlayValues[overlaySelected][overlayValue[overlaySelected]]).split(" ")[0].split("x")[0],
                (overlayValues[overlaySelected][overlayValue[overlaySelected]]).split(" ")[0].split("x")[1]
            )
            break;
    }
}

function keyPressed_OVERLAY_NAVIGATION() {
    if (overlayVisible) {
        switch (key) {
            case "a":
            case "A":
            case "ArrowLeft":
                changeOverlaySelected(-1);
            break;
            case "d":
            case "D":
            case "ArrowRight":
                changeOverlaySelected(1);
            break;

            case "w":
            case "W":
            case "ArrowUp":
                changeOverlayValue(-1);
            break;
            case "s":
            case "S":
            case "ArrowDown":
                changeOverlayValue(1);
            break;

            case "Enter":
            case " ":
                overlayConfirm();
            break;
        }
    }
}