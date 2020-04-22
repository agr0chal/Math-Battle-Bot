chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(null, {
        file: 'bot.js'
      });
    });
  }
});
