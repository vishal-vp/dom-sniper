// Track toolbar icon click status.
import browser from 'webextension-polyfill';

const ports = [];

function connected(p) {
  p.isActivated = false; /* eslint-disable-line no-param-reassign */
  ports[p.sender.tab.id] = p;
  p.onDisconnect.addListener(() => {
    // Remove port from list.
    ports.splice(p.sender.tab.id, 1);
  });
  p.onMessage.addListener((m) => {
    if (m.action === 'deactivate') {
      ports[p.sender.tab.id].isActivated = false;
      browser.browserAction.setIcon({
        path: '../icons/sniper.png',
        tabId: p.sender.tab.id,
      });
    }
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener((tab) => {
  const port = ports[tab.id];
  port.isActivated = !port.isActivated;
  if (port.isActivated) {
    browser.browserAction.setIcon({
      path: '../icons/sniper_active.png',
      tabId: tab.id,
    });
  } else {
    browser.browserAction.setIcon({
      path: '../icons/sniper.png',
      tabId: tab.id,
    });
  }
  port.postMessage({ isActivated: port.isActivated });
});
