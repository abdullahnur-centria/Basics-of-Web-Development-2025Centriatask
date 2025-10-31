// index.js
// Handles validation and submission for the registration form.

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Get DOM Elements ---
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("registrationTable").querySelector("tbody");

  // Input Fields
  const timestampInput = document.getElementById("timestamp");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const birthDateInput = document.getElementById("birthDate");
  const termsInput = document.getElementById("terms");

  // Error Message Placeholders
  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const birthDateError = document.getElementById("birthDateError");
  const termsError = document.getElementById("termsError");

  const errorElements = [fullNameError, emailError, phoneError, birthDateError, termsError];

  // --- 2. Main Submit Event Handler ---
  form.addEventListener("submit", (event) => {
    // Prevent the default form submission (which causes a page reload)
    event.preventDefault();

    // Set the hidden timestamp value
    timestampInput.value = new Date().toISOString();

    // Clear all previous error messages
    clearAllErrors();

    let isValid = true;

    // --- 3. Validation Logic ---

    // Rule 1: Full Name (Required, at least 2 words, each >= 2 chars)
    const fullName = fullNameInput.value.trim();
    const nameWords = fullName.split(' ').filter(w => w.length > 0);

    if (fullName === "") {
      showError(fullNameError, "Full name is required.");
      isValid = false;
    } else if (nameWords.length < 2) {
      showError(fullNameError, "Please enter both first and last name.");
      isValid = false;
    } else if (nameWords.some(word => word.length < 2)) {
      showError(fullNameError, "Each name must be at least 2 characters long.");
      isValid = false;
    }

    // Rule 2: Email (Required, valid format)
    const email = emailInput.value.trim();
    // Basic regex for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError(emailError, "Email address is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError(emailError, "Please enter a valid email (e.g., user@example.com).");
      isValid = false;
    }

    // Rule 3: Phone (Required, Finnish +358 pattern)
    const phone = phoneInput.value.trim();
    // Regex: Starts with +358, optional space/hyphen, then 7-10 digits.
    const phoneRegex = /^\+358[ -]?\d{7,10}$/;
    if (phone === "") {
      showError(phoneError, "Phone number is required.");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      showError(phoneError, "Must be a valid Finnish number (e.g., +358 40 1234567).");
      isValid = false;
    }

    // Rule 4: Birth Date (Required, not in future, >= 13 years old)
    const birthDate = birthDateInput.value;
    if (birthDate === "") {
      showError(birthDateError, "Birth date is required.");
      isValid = false;
    } else {
      const bdateObj = new Date(birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day

      // Check if in the future
      if (bdateObj > today) {
        showError(birthDateError, "Birth date cannot be in the future.");
        isValid = false;
      } else {
        // Check for min age (13)
        const age13Limit = new Date();
        age13Limit.setFullYear(age13Limit.getFullYear() - 13);
        if (bdateObj > age13Limit) {
          showError(birthDateError, "You must be at least 13 years old to register.");
          isValid = false;
        }
      }
    }

    // Rule 5: Terms (Required)
    if (!termsInput.checked) {
      showError(termsError, "You must accept the terms.");
      isValid = false;
    }

    // --- 4. Add to Table if Valid ---
    if (isValid) {
      const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        birthDate: birthDate,
        timestamp: timestampInput.value,
      };

      addTableRow(data);

      // Reset the form for the next entry
      form.reset();
      fullNameInput.focus(); // Focus on the first field
    }
  });

  // --- 5. Helper Functions ---

  /**
   * Displays an error message in the specified element.
   * @param {HTMLElement} element - The <p> element to show the error in.
   * @param {string} message - The error message to display.
   */
  function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
  }

  /**
   * Hides all error messages.
   */
  function clearAllErrors() {
    errorElements.forEach((element) => {
      element.textContent = '';
      element.style.display = 'none';
    });
  }

  /**
   * Creates and appends a new <tr> to the table body.
   * @param {object} data - The form data object.
   */
  function addTableRow(data) {
    const row = document.createElement("tr");

    // Format the timestamp for readability
    const formattedDate = new Date(data.timestamp).toLocaleString('en-GB');

    // Create a cell for each piece of data
    row.appendChild(createCell(data.fullName));
    row.appendChild(createCell(data.email));
    row.appendChild(createCell(data.phone));
    row.appendChild(createCell(data.birthDate));
    row.appendChild(createCell(formattedDate));

    // Add the new row to the end of the table body
    tableBody.appendChild(row);
  }

  /**
   * Utility to create a <td> element with text.
   * @param {string} text - The text content for the cell.
   * @returns {HTMLTableCellElement}
   */
  function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }
  
  // Also clear errors when the form is reset
  form.addEventListener("reset", clearAllErrors);
});