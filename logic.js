document.getElementById("startButtonMBB").addEventListener("click", startTheBot);
document.getElementById("stopButtonMBB").addEventListener("click", stopTheBot);
document.getElementById("updateButtonMBB").addEventListener("click", updateTheBot);

function updateTheBot() {
  var checkbox = document.getElementById('inputHumanMBB').checked;
  humanBehavior = checkbox;
  chrome.storage.sync.set({
    'humanBehavior': humanBehavior
  }, function() {});

  var updateTime = document.getElementById('inputTimeMBB').value;
  var isnum = /^\d+$/.test(updateTime);
  if (isnum) {
    chrome.storage.sync.set({
      'time': updateTime
    }, function() {});
  }

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      humanBehavior: humanBehavior,
      time: updateTime,
      play: false
    });
  });
}

var humanBehavior;
var time;

chrome.storage.sync.get(['humanBehavior'], function(result) {
  humanBehavior = result.humanBehavior;
  document.getElementById('inputHumanMBB').checked = humanBehavior;
});

chrome.storage.sync.get(['time'], function(result) {
  time = result.time;
  document.getElementById('inputTimeMBB').value = time;
});

function startTheBot() {
  chrome.storage.sync.get(['humanBehavior'], function(result) {
    chrome.storage.sync.get(['time'], function(result2) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          humanBehavior: result.humanBehavior,
          time: result2.time,
          play: true
        });
      });
    });
  });
}

function stopTheBot() {
  chrome.storage.sync.get(['humanBehavior'], function(result) {
    chrome.storage.sync.get(['time'], function(result2) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          humanBehavior: result.humanBehavior,
          time: result2.time,
          play: false
        });
      });
    });
  });
}
