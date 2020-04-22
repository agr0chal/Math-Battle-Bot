document.getElementById("startButtonMBB").addEventListener("click", startTheBot);
document.getElementById("stopButtonMBB").addEventListener("click", stopTheBot);
document.getElementById("updateButtonMBB").addEventListener("click", updateTheBot);

function updateTheBot() {
  var checkbox = document.getElementById('inputHumanMBB').checked;
  humanBehaviour = checkbox;
  chrome.storage.sync.set({
    'humanBehaviour': humanBehaviour
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
      humanBehaviour: humanBehaviour,
      time: updateTime,
      play: false
    });
  });
}

var humanBehaviour;
var time;

chrome.storage.sync.get(['humanBehaviour'], function(result) {
  humanBehaviour = result.humanBehaviour;
  document.getElementById('inputHumanMBB').checked = humanBehaviour;
});

chrome.storage.sync.get(['time'], function(result) {
  time = result.time;
  document.getElementById('inputTimeMBB').value = time;
});

function startTheBot() {
  chrome.storage.sync.get(['humanBehaviour'], function(result) {
    chrome.storage.sync.get(['time'], function(result2) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          humanBehaviour: result.humanBehaviour,
          time: result2.time,
          play: true
        });
      });
    });
  });
}

function stopTheBot() {
  chrome.storage.sync.get(['humanBehaviour'], function(result) {
    chrome.storage.sync.get(['time'], function(result2) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          humanBehaviour: result.humanBehaviour,
          time: result2.time,
          play: false
        });
      });
    });
  });
}
