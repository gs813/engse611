  // Select all the navigation links
  const navLinks = document.querySelectorAll('nav ul li a');

  // Iterate over each link and add an event listener for the click event
  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          // Prevent the default action (which is navigation) from happening
          event.preventDefault();

          // Show the alert
          alert('clicked!');
      });
  });