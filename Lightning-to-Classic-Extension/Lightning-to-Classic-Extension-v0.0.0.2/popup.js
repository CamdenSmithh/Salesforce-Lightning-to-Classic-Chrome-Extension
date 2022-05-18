const classicBtn = document.getElementById('classicBtn');

const donateBtn = document.getElementById('donateBtn');

classicBtn.addEventListener('click', function() {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    let tab = tabs[0];

    if (tab.url.includes("lightning")) {

      chrome.runtime.sendMessage({ 
        message: 'classic',
        tab: tab,
      });
    }
  });
});

donateBtn.addEventListener('click', function() {
  chrome.tabs.create({
    url: 'https://www.paypal.com/donate/?business=H8BEU6K99EWKU&no_recurring=1&item_name=Thank+you+for+your+donation%21+Please+let+me+know+what+features+you+would+like+added+to+the+extension+%3A%29&currency_code=USD'
  });
});