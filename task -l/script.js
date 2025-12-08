// Author: Md Abdullah Ibne Shahid Nur
// Date: 2025-12-08

// Optional enhancement
function scrollToExample() {
  const exampleSection = document.querySelector(".example-section");
  if (exampleSection) {
    exampleSection.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Set minimum date for rental start/end to today
  const today = new Date().toISOString().split("T")[0];
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (startDateInput) {
    startDateInput.min = today;
  }
  if (endDateInput) {
    endDateInput.min = today;
  }

  const form = document.getElementById("rentalOrderForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      // HTML5 validation
      if (!form.checkValidity()) {
        event.preventDefault();
        form.classList.add("show-errors");
        form.reportValidity();
        return;
      }

      // Prevent real submission (no backend) and just go to thanks page
      event.preventDefault();
      window.location.href = "thanks.html";
    });
  }
});
