// Track toolbar icon click status.
let isActivated = false;
let ports = [];
let states = {};

function connected(p) {
  ports[p.sender.tab.id] = p;
  p.onDisconnect.addListener(() => {
    // Remove port from list.
    ports.splice(p.sender.tab.id, 1);
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  isActivated = !isActivated;
  ports.forEach(p => {
    p.postMessage({'isActivated': isActivated});
  })
});
