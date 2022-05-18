var classicObj = {};

function changeToClassic(tab) {
  let lightningCurrentUrl = new URL(tab.url);

  let lightningCurrentUrlArray = (lightningCurrentUrl.pathname).split('/');

  var urlSnippet = (lightningCurrentUrlArray.filter((url) => url.startsWith('0')).toString());

  let classicUrl = (lightningCurrentUrl.origin) + '/ltng/switcher?destination=classic';

  chrome.tabs.update(tab.id, {url: classicUrl});

  if (urlSnippet !== '') {
    globalThis.classicObj = { urlSnippet: urlSnippet };

    chrome.tabs.onUpdated.addListener(myListener);
  } 
};

function newPage(tab) {
  let classicCurrentUrl = new URL(tab.url);

  let classicOrigin = classicCurrentUrl.origin;

  let recentItem = classicOrigin + '/' + classicObj.urlSnippet;

  chrome.tabs.update(tab.id, {url: recentItem});

  globalThis.classicObj = {};

  chrome.tabs.onUpdated.removeListener(myListener);
}

function myListener(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && classicObj.urlSnippet !== '') {
    newPage(tab);
  }
};

chrome.runtime.onMessage.addListener(function(greeting) {
  if (greeting.message === 'classic') {
    changeToClassic(greeting.tab);
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.sync.get('checkboxId', function(data) {
    if (data.checkboxId && tab.url.includes("lightning") && (!tab.url.includes("%")) && changeInfo.status === 'complete') {
      changeToClassic(tab);
    }
  });
});

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'welcome/welcome.html'
    });
  }
  if (details.reason === 'update') {
    chrome.tabs.create({
      url: 'welcome/welcome.html'
    });
  } 
});

