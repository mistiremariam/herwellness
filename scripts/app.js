/* =======================
   DYNAMIC COMPONENT LOADER
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Component not found: " + file);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = `<p style="color:red; text-align:center;">⚠ Error loading ${file}</p>`;
        console.error(err);
      });
  });
});

/* =======================
   MOBILE NAV TOGGLE
======================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active") ? "&times;" : "&#9776;";
  });
}

/* =======================
   SCROLL ANIMATIONS
======================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});

/* Add "visible" state styling */
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  </style>`
);
// ----------------- Chatbot Toggle -----------------
document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.classList.toggle("active");
    });
  }

  // ----------------- Mood Tracker -----------------
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodNote = document.querySelector(".mood-note textarea");
  const saveMoodBtn = document.querySelector(".mood-note .btn-primary");

  // Container for history
  let moodHistoryContainer = document.createElement("div");
  moodHistoryContainer.classList.add("mood-history");
  let mainSection = document.querySelector("main .container");
  if (mainSection) {
    mainSection.appendChild(moodHistoryContainer);
  }

  let selectedMood = null;

  // Highlight selected mood
  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedMood = btn.dataset.mood;
      moodButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  // Save mood + note
  if (saveMoodBtn) {
    saveMoodBtn.addEventListener("click", () => {
      if (!selectedMood) {
        alert("Please select a mood first 😊");
        return;
      }

      let note = moodNote.value.trim();
      let date = new Date().toLocaleString();

      let moodEntry = { mood: selectedMood, note, date };

      // Save to localStorage
      let moods = JSON.parse(localStorage.getItem("moods")) || [];
      moods.push(moodEntry);
      localStorage.setItem("moods", JSON.stringify(moods));

      // Reset inputs
      moodNote.value = "";
      selectedMood = null;
      moodButtons.forEach((b) => b.classList.remove("selected"));

      // Refresh history
      displayMoodHistory();
    });
  }

  // Display mood history
  function displayMoodHistory() {
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moodHistoryContainer.innerHTML = "<h3>Your Mood History</h3>";

    if (moods.length === 0) {
      moodHistoryContainer.innerHTML += "<p class='muted'>No moods tracked yet.</p>";
      return;
    }

    let list = document.createElement("ul");
    list.classList.add("mood-list");

    moods.slice().reverse().forEach((entry) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <strong>${entry.mood}</strong> - ${entry.date} <br>
        <em>${entry.note || "No note"}</em>
      `;
      list.appendChild(li);
    });

    moodHistoryContainer.appendChild(list);
  }

  // Load history on page load
  displayMoodHistory();
});
