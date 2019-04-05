// Track toolbar icon click status.
let isActivated = false;
let ports = [];
let states = {};

function connected(p) {
  p.isActivated = false;
  ports[p.sender.tab.id] = p;
  p.onDisconnect.addListener(() => {
    // Remove port from list.
    ports.splice(p.sender.tab.id, 1);
  });
  p.onMessage.addListener((m) => {
    if (m.action === 'deactivate') {
      ports[p.sender.tab.id].isActivated = false;
    }
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function(tab) {
  port = ports[tab.id];
  port.isActivated = !port.isActivated;
  port.postMessage({'isActivated': port.isActivated});
});
