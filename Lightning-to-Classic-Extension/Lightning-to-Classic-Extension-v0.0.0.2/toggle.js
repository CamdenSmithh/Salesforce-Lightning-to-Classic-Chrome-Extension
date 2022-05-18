let checked1 = false;

chrome.storage.sync.get('checkboxId', function(data) {
  if (!data.hasOwnProperty('checkboxId') || typeof data.checkboxId === 'undefined') {
    data.checkboxId = checked1;
  }
  document.getElementById('checkboxId').checked = data.checkboxId
});

function storeChecked() {
  let checkState = document.getElementById('checkboxId').checked;
  chrome.storage.sync.set({checkboxId: checkState});
}

document.getElementById('checkboxId').addEventListener('change', storeChecked);