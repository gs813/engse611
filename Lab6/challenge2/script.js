// Select all paragraphs inside the div with id "main"
var paragraphs = document.querySelectorAll('#main p');

// Loop through each paragraph and check if it contains "Llamas and Chickens!"
paragraphs.forEach(function(paragraph) {
  if (paragraph.textContent.includes("Llamas and Chickens!")) {
    paragraph.style.color = "red"; // Change the color to red
  }
});
