// Track toolbar icon click status.
import browser from 'webextension-polyfill';
import * as constants from './constants';

const portObjs = [];

/**
 * Handle connection from browser tabs.
 */
function onConnected(p) {
  p.onDisconnect.addListener(() => {
    // Remove port from list.
    portObjs.splice(p.sender.tab.id, 1);
  });
  p.onMessage.addListener((m) => {
    if (m.action === constants.browserActions.DEACTIVATE) {
      portObjs[p.sender.tab.id].isActivated = false;
      browser.browserAction.setIcon({
        path: '../icons/sniper.png',
        tabId: p.sender.tab.id,
      });
    }
  });
  portObjs[p.sender.tab.id] = {
    port: p,
    isActivated: false,
  };
}

/**
 * Activate/Deactivate extension on specific page.
 */
browser.browserAction.onClicked.addListener((tab) => {
  const portObj = portObjs[tab.id];
  portObj.isActivated = !portObj.isActivated;
  if (portObj.isActivated) {
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
  portObj.port.postMessage({ isActivated: portObj.isActivated });
});

browser.runtime.onConnect.addListener(onConnected);
