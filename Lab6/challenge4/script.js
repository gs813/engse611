// Select all the anchor tags inside the nav
const navLinks = document.querySelectorAll('nav a');

// Add a click event listener to each link
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Show an alert with the text of the clicked link
    alert(this.textContent);
  });
});
