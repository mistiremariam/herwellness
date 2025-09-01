// journal.js

// Select elements
const journalForm = document.getElementById("journal-form");
const journalInput = document.getElementById("journal-input");
const journalList = document.getElementById("journal-list");

// Load saved entries from localStorage
let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
renderEntries();

// Add new entry
journalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entryText = journalInput.value.trim();
  if (!entryText) return;

  const entry = {
    id: Date.now(),
    text: entryText,
    date: new Date().toLocaleString()
  };

  entries.unshift(entry); // add to the beginning
  saveEntries();
  renderEntries();
  journalInput.value = "";
});

// Render all entries
function renderEntries() {
  journalList.innerHTML = "";

  if (entries.length === 0) {
    journalList.innerHTML = `<p class="empty-msg">No entries yet. Start journaling! 🌸</p>`;
    return;
  }

  entries.forEach((entry) => {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("journal-entry");
    entryDiv.innerHTML = `
      <p class="entry-date">${entry.date}</p>
      <p class="entry-text">${entry.text}</p>
      <button class="delete-entry" data-id="${entry.id}">❌</button>
    `;
    journalList.appendChild(entryDiv);
  });

  // Add delete functionality
  document.querySelectorAll(".delete-entry").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      entries = entries.filter((entry) => entry.id !== id);
      saveEntries();
      renderEntries();
    });
  });
}

// Save entries to localStorage
function saveEntries() {
  localStorage.setItem("journalEntries", JSON.stringify(entries));
}
