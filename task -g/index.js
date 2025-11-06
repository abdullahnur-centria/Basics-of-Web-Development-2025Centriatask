// index.js
// Author: Md Abdullah Ibne Shahid Nur
// Date: 2025-11-06
// Handles validation and submission for the registration form.
// This version does NOT use helper functions, per request.

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

    // --- INLINED clearAllErrors() ---
    errorElements.forEach((element) => {
      element.textContent = '';
      element.style.display = 'none';
    });
    // ---

    let isValid = true;

    // --- 3. Validation Logic (with inlined showError) ---

    // Rule 1: Full Name (Required, at least 2 words, each >= 2 chars)
    const fullName = fullNameInput.value.trim();
    const nameWords = fullName.split(' ').filter(w => w.length > 0);

    if (fullName === "") {
      // --- INLINED showError ---
      fullNameError.textContent = "Full name is required.";
      fullNameError.style.display = 'block';
      // ---
      isValid = false;
    } else if (nameWords.length < 2) {
      // --- INLINED showError ---
      fullNameError.textContent = "Please enter both first and last name.";
      fullNameError.style.display = 'block';
      // ---
      isValid = false;
    } else if (nameWords.some(word => word.length < 2)) {
      // --- INLINED showError ---
      fullNameError.textContent = "Each name must be at least 2 characters long.";
      fullNameError.style.display = 'block';
      // ---
      isValid = false;
    }

    // Rule 2: Email (Required, valid format)
    const email = emailInput.value.trim();
    // Basic regex for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      // --- INLINED showError ---
      emailError.textContent = "Email address is required.";
      emailError.style.display = 'block';
      // ---
      isValid = false;
    } else if (!emailRegex.test(email)) {
      // --- INLINED showError ---
      emailError.textContent = "Please enter a valid email (e.g., user@example.com).";
      emailError.style.display = 'block';
      // ---
      isValid = false;
    }

    // Rule 3: Phone (Required, Finnish +358 pattern)
    const phone = phoneInput.value.trim();
    // Regex: Starts with +358, optional space/hyphen, then 7-10 digits.
    const phoneRegex = /^\+358[ -]?\d{7,10}$/;
    if (phone === "") {
      // --- INLINED showError ---
      phoneError.textContent = "Phone number is required.";
      phoneError.style.display = 'block';
      // ---
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      // --- INLINED showError ---
      phoneError.textContent = "Must be a valid Finnish number (e.g., +358 40 1234567).";
      phoneError.style.display = 'block';
      // ---
      isValid = false;
    }

    // Rule 4: Birth Date (Required, not in future, >= 13 years old)
    const birthDate = birthDateInput.value;
    if (birthDate === "") {
      // --- INLINED showError ---
      birthDateError.textContent = "Birth date is required.";
      birthDateError.style.display = 'block';
      // ---
      isValid = false;
    } else {
      const bdateObj = new Date(birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day

      // Check if in the future
      if (bdateObj > today) {
        // --- INLINED showError ---
        birthDateError.textContent = "Birth date cannot be in the future.";
        birthDateError.style.display = 'block';
        // ---
        isValid = false;
      } else {
        // Check for min age (13)
        const age13Limit = new Date();
        age13Limit.setFullYear(age13Limit.getFullYear() - 13);
        if (bdateObj > age13Limit) {
          // --- INLINED showError ---
          birthDateError.textContent = "You must be at least 13 years old to register.";
          birthDateError.style.display = 'block';
          // ---
          isValid = false;
        }
      }
    }

    // Rule 5: Terms (Required)
    if (!termsInput.checked) {
      // --- INLINED showError ---
      termsError.textContent = "You must accept the terms.";
      termsError.style.display = 'block';
      // ---
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

      // --- INLINED addTableRow ---
      const row = document.createElement("tr");

      // Format the timestamp for readability
      const formattedDate = new Date(data.timestamp).toLocaleString('en-GB');

      // --- INLINED createCell (x5) ---
      const cell1 = document.createElement("td");
      cell1.textContent = data.fullName;
      row.appendChild(cell1);

      const cell2 = document.createElement("td");
      cell2.textContent = data.email;
      row.appendChild(cell2);

      const cell3 = document.createElement("td");
      cell3.textContent = data.phone;
      row.appendChild(cell3);
      
      const cell4 = document.createElement("td");
      cell4.textContent = data.birthDate;
      row.appendChild(cell4);
      
      const cell5 = document.createElement("td");
      cell5.textContent = formattedDate;
      row.appendChild(cell5);
      // ---

      // Add the new row to the end of the table body
      tableBody.appendChild(row);
      // ---

      // Reset the form for the next entry
      form.reset();
      fullNameInput.focus(); // Focus on the first field
    }
  });

  // Also clear errors when the form is reset
  // We must also inline the clearAllErrors logic here
  form.addEventListener("reset", () => {
    errorElements.forEach((element) => {
      element.textContent = '';
      element.style.display = 'none';
    });
  });
});