// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});

// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Optional: Greeting message dynamically
const header = document.querySelector('.dashboard-header h1');
if (header) {
  const hours = new Date().getHours();
  if (hours < 12) header.textContent = "Good Morning, Beautiful!";
  else if (hours < 18) header.textContent = "Good Afternoon, Beautiful!";
  else header.textContent = "Good Evening, Beautiful!";
}

// Optional: Add hover shadow effect for cards dynamically
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  });
});
