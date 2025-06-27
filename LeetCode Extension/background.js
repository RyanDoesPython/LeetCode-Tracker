let siteData;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "triggerScrape") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const tabUrl = tab.url;

      chrome.tabs.sendMessage(tab.id, { action: "scrape" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Scrape failed:", chrome.runtime.lastError.message);
        } else {

          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth() + 1; // Add 1 to get the correct month
          const day = today.getDate();

          const result = {
            url: tabUrl,
            difficulty: response.difficulty,
            name: response.name,
            problemNumber: response.problemNumber,
            date: `${month}-${day}-${year}`
          };

          siteData = result;
        }
      });
    });

    return true; // Keeps the message channel open for async response
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "popUp") {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 400,
      height: 500
    });
  }

  if (message.action === "returnData") {
    sendResponse(siteData); // ✅ This is what actually sends the data back
  }

  return true; // ✅ Required if you're responding asynchronously (good practice anyway)

})

