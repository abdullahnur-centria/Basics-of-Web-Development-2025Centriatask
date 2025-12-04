// Author: Md Abdullah Ibne Shahid Nur
// Date: 2025-12-04

// Function to handle the "See Available Rentals" button click (not required now, kept for reference)
function viewRentals() {
  alert("Redirecting to rental options...");
  // In production: window.location.href = "/catalog.html";
}

// Optional enhancement
function scrollToExample() {
  const exampleSection = document.querySelector(".example-section");
  if (exampleSection) {
    exampleSection.scrollIntoView({ behavior: "smooth" });
  }
}

// --- Order form helpers ---

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

  // Simple HTML5 validation helper: highlight invalid fields on submit
  const form = document.getElementById("rentalOrderForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.classList.add("show-errors");
      }
    });
  }
});
