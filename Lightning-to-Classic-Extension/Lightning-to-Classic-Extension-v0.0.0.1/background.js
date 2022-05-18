chrome.action.onClicked.addListener((tab) => {

  if (tab.url.includes("lightning")) {

    let lightningCurrentUrl = new URL(tab.url);

    let lightningCurrentUrlArray = (lightningCurrentUrl.pathname).split('/');

    let urlSnippet = (lightningCurrentUrlArray.filter((url) => url.startsWith('0')).toString());

    let classicUrl = (lightningCurrentUrl.origin) + '/ltng/switcher?destination=classic';

    chrome.tabs.update(tab.id, {url: classicUrl});

    let execute = true;

    newPage(urlSnippet, execute);
  }
});

function newPage(urlSnippet, execute) {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && execute === true && urlSnippet !== '') {

      let classicCurrentUrl = new URL(tab.url);

      let classicOrigin = classicCurrentUrl.origin;

      let recentItem = classicOrigin + '/' + urlSnippet;

      chrome.tabs.update(tab.id, {url: recentItem});

      chrome.tabs.onUpdated.removeListener(newPage);

      execute = false;
    }
  });
}

