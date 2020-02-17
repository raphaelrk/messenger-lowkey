chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      cancel: true,
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


// need to make these

// chrome.runtime.onInstalled.addListener(function(details) {
//   if ((details.reason = 'install')) {
//     chrome.tabs.create({ url: 'https://unread.chat/welcome' });
//   }
// });

// chrome.runtime.setUninstallURL('https://unread.chat/uninstall');
