// get the url of current tab and populate URL/link field
window.onload = function(){
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    document.getElementById("link").value = tabs[0].url;
  });
};

document.getElementById("add").addEventListener("click", addData);

function addData() {
    company = document.getElementById("company").value;
    role = document.getElementById("role").value;
    link = document.getElementById("link").value;
    date = new Date().toLocaleDateString();

    // this is trying to fetch the auth token, interactive: true means it will prompt user if we don't have it
    // prompting will go through the oauth screen, get consent for the scopes detailed in manifest
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      // the row to add
      var params = {
        'values': [
          [company, role, date, link]
        ]
      };

      let init = {
        method: 'POST',
        async: true,
        body: JSON.stringify(params),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };

      spreadsheetId = // GOOGLE SPREADSHEET ID HERE // ;
      range = 'Current!A1:E1';
      key = // API KEY HERE //;

      fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&key=${key}`,
          init)
          .then((response) => response.json())
          .then(function(data) {
            // console.log(data);
          });
    });
  };