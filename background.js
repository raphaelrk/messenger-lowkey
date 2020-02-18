var ghostMode = true;

chrome.storage.sync.get(['ghostMode'], function(result) {
  ghostMode = result.ghostMode === false ? false : true;

  chrome.browserAction.setTitle({ title: ghostMode ? "Read receipts are off" : "Read receipts are on" });
  chrome.browserAction.setIcon({ path: ghostMode ? "images/icon_128.png" : "images/icon_128_gray.png" });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  ghostMode = !ghostMode;
  chrome.storage.sync.set({ ghostMode });

  chrome.browserAction.setTitle({ title: ghostMode ? "Read receipts are off" : "Read receipts are on" });
  chrome.browserAction.setIcon({ path: ghostMode ? "images/icon_128.png" : "images/icon_128_gray.png" });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      cancel: ghostMode,
    };
  },
  {
    urls: [
      // block "seen"
      '*://*.facebook.com/*change_read_status*',
      '*://*.messenger.com/*change_read_status*',

      // block chat receipts
      '*://*.facebook.com/*delivery_receipts*',
      '*://*.messenger.com/*delivery_receipts*',
      '*://*.facebook.com/*unread_threads*',
      '*://*.messenger.com/*unread_threads*',

      // block typing indicator
      '*://*.facebook.com/*typ.php*',
      '*://*.messenger.com/*typ.php*',

      // not sure if these are necessary
      '*://*.facebook.com/*mark_read*',
      '*://*.messenger.com/*mark_read*',
      '*://*.facebook.com/*mark_seen*',
      '*://*.messenger.com/*mark_seen*',
    ]
  },
  ['blocking']
);

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') chrome.tabs.create({ url: 'http://unread.chat/welcome' });
  // if (details.reason === 'update') chrome.tabs.create({ url: 'http://unread.chat/welcome' });
});

chrome.runtime.setUninstallURL('http://unread.chat/uninstalled');
