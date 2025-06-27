let idToDelete;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");

  container.addEventListener("click", (event) => {
    // Checks if *any ancestor* of the click target has the deleteButton class
    const button = event.target.closest(".deleteButton");

    if (button) {
      console.log("Delete ID:", button.id);

      const confirmationBox = document.createElement("div");
      confirmationBox.className = "confirmationBox"

      confirmationBox.innerHTML = `
        <h3 class="deletePromptText">Are you sure you want to delete problem #${button.id}</h3>
        <div class="buttonHolder">
          <button id="cancel" class="cancel">Cancel</button>

          <button id="confirm" class="confirm">Confirm</button>
        </div>
      `
      document.getElementById("body").appendChild(confirmationBox)

      const confirmBtn = document.getElementById("confirm");
      confirmBtn.addEventListener("click", () => {
        deleteCard(button.id);

        fetch("http://localhost:3000/api/cards")
        .then(res => res.json())
        .then(cards => {
          loadCards(cards, sortSetting, filterSetting);
        })
      });

      const cancelBtn = document.getElementById("cancel");
      cancelBtn.addEventListener("click", () => {
        confirmationBox.remove()
      })
    }
  });
});


function deleteCard(id){
        fetch(`http://localhost:3000/api/cards/${id}`, {
        method: "DELETE",
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server returned an error");
        }
        return response.json();
      })
      .then(data => {
        console.log("✅ deleted:", data);
      })
      .catch(error => {
        console.log("❌ Failed to delete card: " + error.message);
      });
}
