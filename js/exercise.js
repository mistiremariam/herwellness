// exercise.js

// List of exercises for the day
const exercises = [
  "10 Jumping Jacks",
  "15 Squats",
  "10 Push-Ups",
  "20-Second Plank",
  "15 Lunges",
  "10 Burpees",
  "30-Second Wall Sit"
];

// Motivation messages
const motivations = [
  "You're doing amazing! 💪",
  "Keep going, beautiful! 🌸",
  "Stay strong and confident! ✨",
  "Every move counts! 💖",
  "Feel the energy! ⚡"
];

// Select elements
const exerciseDisplay = document.getElementById("exercise-display");
const timerDisplay = document.getElementById("timer");
const motivationDisplay = document.getElementById("motivation");
const startButton = document.getElementById("start-exercise");

let timerInterval;
let exerciseIndex = 0;

// Function to start exercise
function startExercise() {
  startButton.disabled = true; // Disable button to prevent multiple clicks
  showExercise(exercises[exerciseIndex]);
}

// Show an exercise
function showExercise(exercise) {
  exerciseDisplay.textContent = exercise;
  exerciseDisplay.classList.add("animate");

  // Pick a random motivational message
  motivationDisplay.textContent = motivations[Math.floor(Math.random() * motivations.length)];

  // Start countdown timer (30 seconds per exercise)
  let timeLeft = 30;
  timerDisplay.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextExercise();
    }
  }, 1000);

  // Animate exercise title
  setTimeout(() => {
    exerciseDisplay.classList.remove("animate");
  }, 500);
}

// Move to next exercise
function nextExercise() {
  exerciseIndex++;
  if (exerciseIndex < exercises.length) {
    showExercise(exercises[exerciseIndex]);
  } else {
    exerciseDisplay.textContent = "Workout Complete! 🎉";
    timerDisplay.textContent = "0:00";
    motivationDisplay.textContent = "You crushed it today! 🌸💖";
    startButton.disabled = false;
    exerciseIndex = 0; // reset for next time
  }
}

// Format timer in MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Event listener
startButton.addEventListener("click", startExercise);
// Greet user on page load
window.addEventListener("load", () => {
  motivationDisplay.textContent = "Welcome back! Ready to crush your workout? 💖";
});