chrome.storage.sync.get(['humanBehavior'], function(result) {
  chrome.storage.sync.get(['time'], function(result2) {
    var play = true;
    var humanBehavior = result.humanBehavior;
    var time = parseInt(result2.time, 10);
    var mistakeProtection = 8;
    var min;
    var max;
    updateRange(time);

    chrome.extension.onMessage.addListener(handleMessage);

    function handleMessage(request) {
      time = request.time;
      updateRange(time);
      humanBehavior = request.humanBehavior;
      play = request.play;
      if (play === true) {
        startTheBot();
      } else if (play === false) {
        stopTheBot();
      }
    }

    function eventFire(el, etype) {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }

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

    function updateRange(x) {
      min = parseInt(x, 10) - 60;
      if (min < 0) min = 0;
      max = parseInt(x, 10) + 60;
    }

  });
});
