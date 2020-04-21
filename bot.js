/***SETTINGS***/
var time = 500; // Time to answer in milliseconds.
var humanBehavior = true; // Enable features like answering in various time and making intentional mistakes to make the bot less detectable.
/**************/

/*
Paste this script into some JavaScript injection extension.
*/


function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function updateTheBot() {
    var checkbox = document.getElementById('inputHumanMBB').checked;

    humanBehavior = checkbox;
}

var play = true;
var mistakeProtection = 8;

function makeAnswer() {
    if (play) {
        var x = document.querySelector("#task_x").textContent;
        var op = document.querySelector("#task_op").textContent;
        var y = document.querySelector("#task_y").textContent;
        var quest = document.querySelector("#task_res").textContent;
        var result = 0;
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        quest = parseInt(quest, 10);
        if (op == "×") {
            result = x * y;
        } else if (op == "–") {
            result = x - y;
        } else if (op == '+') {
            result = x + y;
        } else if (op == '/') {
            result = x / y;
        }
        var answer = (result == quest);
        if (humanBehavior) {
            mistake = Math.floor(Math.random() * 41);
            if (mistake === 0 && mistakeProtection === 0) {
                answer = !answer;
                mistakeProtection = 8;
            } else {
                if (mistakeProtection > 0) mistakeProtection--;
            }
        }
        if (answer) {
            eventFire(document.getElementById('button_correct'), 'click');
        } else {
            eventFire(document.getElementById('button_wrong'), 'click');
        }
    }
}

if (humanBehavior) {
    var min = time - 60;
    var max = time + 60;
}

function startTheBot() {
    play = true;
    runTheBot();
}

function runTheBot() {
    if (humanBehavior) {
        responseTime = Math.floor(Math.random() * (max - min)) + min;
    } else {
        responseTime = time;
    }
    if (play) {
        makeAnswer();
        setTimeout(function() {
            runTheBot();
        }, responseTime);
    }
}

function stopTheBot() {
    play = false;
}

function createGUI() {
    var body = document.getElementsByTagName('body')[0];

    var GUI = document.createElement("div");
    GUI.setAttribute("id", "GUIMBB");

    var header = document.createElement("div");
    header.setAttribute("id", "headerMBB");
    header.textContent = "Math Battle Bot v1.0 by agrochal";


    var box = document.createElement("div");
    box.setAttribute("id", "boxMBB");


    var startButton = document.createElement("div");
    startButton.setAttribute("id", "startButtonMBB");
    startButton.textContent = "Start";
    startButton.className = "buttonMBB";

    var stopButton = document.createElement("div");
    stopButton.setAttribute("id", "stopButtonMBB");
    stopButton.textContent = "Stop";
    stopButton.className = "buttonMBB";

    var form = document.createElement("form");

    var labelHuman = document.createElement("label");
    labelHuman.setAttribute("for", "inputHumanMBB");
    labelHuman.textContent = "Human Behavior: ";

    var inputHuman = document.createElement("input");
    inputHuman.setAttribute("id", "inputHumanMBB");
    inputHuman.setAttribute("type", "checkbox");
    inputHuman.checked = humanBehavior;

    var updateButton = document.createElement("div");
    updateButton.setAttribute("id", "updateButtonMBB");
    updateButton.textContent = "Update";
    updateButton.className = "buttonMBB";

    GUI.appendChild(header);
    box.appendChild(startButton);
    box.appendChild(stopButton);
    form.appendChild(labelHuman);
    form.appendChild(inputHuman);
    GUI.appendChild(form);
    GUI.appendChild(updateButton);
    GUI.appendChild(box);
    body.appendChild(GUI);
    document.getElementById("startButtonMBB").addEventListener("click", startTheBot);
    document.getElementById("stopButtonMBB").addEventListener("click", stopTheBot);
    document.getElementById("updateButtonMBB").addEventListener("click", updateTheBot);
}

createGUI();
