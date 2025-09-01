// chatbot.js

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Predefined responses
  const responses = {
    hello: "Hey beautiful 💖! How are you feeling today?",
    hi: "Hi love ✨! Ready to focus on your wellness?",
    exercise: "🌸 Staying active is so important! Try a 10-min stretch or a brisk walk today.",
    journal: "📝 Journaling is self-care. Write down 3 things you’re grateful for right now.",
    nutrition: "🥗 Remember to eat colorful! Greens + protein + whole grains = balanced meal.",
    stress: "🌺 Deep breaths, queen 👑. Inhale peace, exhale stress. You've got this.",
    period: "💌 Track your cycle in the Period Tracker. Want me to show you how?",
    default: "💕 I’m here for you! You can ask about journaling, exercise, nutrition, or stress relief."
  };

  // Function to add a message to chat
  function addMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Function to simulate bot typing
  function botReply(text) {
    addMessage("typing...", "bot typing");
    setTimeout(() => {
      document.querySelector(".bot.typing").remove();
      addMessage(text, "bot");
    }, 1200);
  }

  // Handle sending message
  function sendMessage() {
    const message = userInput.value.trim().toLowerCase();
    if (!message) return;

    addMessage(userInput.value, "user");
    userInput.value = "";

    // Get response
    let reply = responses.default;
    for (let key in responses) {
      if (message.includes(key)) {
        reply = responses[key];
        break;
      }
    }

    botReply(reply);
  }

  // Event listeners
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Greet user at start
  setTimeout(() => {
    botReply("✨ Hi gorgeous! I'm your Wellness Companion AI 💕. How can I support you today?");
  }, 800);
});
