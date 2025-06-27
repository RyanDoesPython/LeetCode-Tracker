const notesMenu = document.getElementById("notesMenu")

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");

  container.addEventListener("mouseenter", (event) => {
    const button = event.target.closest(".notesButton");

    if (button) {
    fetch("https://leetcode-tracker-m6ye.onrender.com/api/cards")
    .then(res => res.json())
    .then(cards => {
      const card = cards.find(c => String(c.problemNumber) === String(button.id));
      if (card) {
        const rect = button.getBoundingClientRect();

        notesMenu.style.display = 'block'; // Make sure it's visible so we can measure its dimensions

        if(card.notes.length > 0){
          notesMenu.innerHTML = card.notes;
        }else{
          notesMenu.innerHTML = "No notes left for this problem.";
        }

        const menuWidth = notesMenu.offsetWidth;
        const menuHeight = notesMenu.offsetHeight;

        // Center the menu horizontally relative to the button
        const offsetX = rect.left + rect.width / 2 - menuWidth / 2;
        let offsetY = rect.bottom + 8; // Default position: 8px below the button

        // Check if it would go off screen (bottom)
        const projectedBottom = rect.bottom + 8 + menuHeight;
        if (projectedBottom > window.innerHeight) {
          // If so, place it above instead
          offsetY = rect.top - menuHeight - 8;
        }

        notesMenu.style.left = `${offsetX + window.scrollX}px`;
        notesMenu.style.top = `${offsetY + window.scrollY}px`;
      }

    });
    
    }else{
        notesMenu.style.display = 'none';
    }

  }, true); // 👈 Use capture phase so it catches mouseenter properly
});
