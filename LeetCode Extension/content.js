document.addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
      console.log("Delete key detected — sending message to background");
      chrome.runtime.sendMessage({ action: "popUp" })
      chrome.runtime.sendMessage({ action: "triggerScrape" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("Background responded:", response);
        }
      });
    }
  });
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrape") {
    const matchingDivs = [
      ...document.querySelectorAll("div.bg-fill-secondary.relative.px-2.py-1.gap-1")
    ];
    
    const difficulty = matchingDivs.map(div => div.textContent.trim()).filter(a => a == "Hard" || a == "Easy" || a == "Medium")[0];

      const problemTitle = [...document.querySelectorAll("a.truncate.no-underline.whitespace-normal")]
      .map(a => a.textContent.trim())
      .filter(a => a.length > 0)
      .flatMap(text => text.split(". "));

      const problemNumber = problemTitle[0]
      const name = problemTitle[1]
    
    console.log(name)

    sendResponse({ difficulty: difficulty, name: name, problemNumber: problemNumber });
  }
});

