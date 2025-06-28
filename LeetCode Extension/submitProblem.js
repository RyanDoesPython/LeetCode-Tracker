let userInputData = { notes: "", time: ""};
let siteData;

const submitButton = document.getElementById("submitButton");
const userNotes = document.getElementById("userNotes");
const timeInput = document.getElementById("timeInput");

submitButton.addEventListener("click", () => {
    userInputData.notes = userNotes.value;
    userInputData.time = timeInput.value;

    chrome.runtime.sendMessage({ action: "returnData" }, (siteData) => {

    const fullData = { ...userInputData, ...siteData };
    console.log("Combined data:", fullData);

    fetch("https://leetcode-tracker-m6ye.onrender.com/api/add-card", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fullData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Card saved to server:", data);
            window.close();
        })
        .catch(error => {
            alert("❌ Failed to send data:", error);
    });
  });
});


  