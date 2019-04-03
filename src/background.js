// Track toolbar icon click status.
let isActivated = false;

// Receive messages from content script.
let portFromCS;

function connected(p) {
  portFromCS = p;
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  isActivated = !isActivated;
  portFromCS.postMessage({'isActivated': isActivated});
});
