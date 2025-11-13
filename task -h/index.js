// index.js
// Author: Md Abdullah Ibne Shahid Nur
// Date: 2025-11-13
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Email address is required.";
      emailError.style.display = 'block';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email (e.g., user@example.com).";
      emailError.style.display = 'block';
      isValid = false;
    }

    // Rule 3: Phone (Required, Finnish +358 pattern)
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\+358[ -]?\d{7,10}$/;
    if (phone === "") {
      phoneError.textContent = "Phone number is required.";
      phoneError.style.display = 'block';
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Must be a valid Finnish number (e.g., +358 40 1234567).";
      phoneError.style.display = 'block';
      isValid = false;
    }

    // Rule 4: Birth Date (Required, not in future, >= 13 years old)
    const birthDate = birthDateInput.value;
    if (birthDate === "") {
      birthDateError.textContent = "Birth date is required.";
      birthDateError.style.display = 'block';
      isValid = false;
    } else {
      const bdateObj = new Date(birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (bdateObj > today) {
        birthDateError.textContent = "Birth date cannot be in the future.";
        birthDateError.style.display = 'block';
        isValid = false;
      } else {
        const age13Limit = new Date();
        age13Limit.setFullYear(age13Limit.getFullYear() - 13);
        if (bdateObj > age13Limit) {
          birthDateError.textContent = "You must be at least 13 years old to register.";
          birthDateError.style.display = 'block';
          isValid = false;
        }
      }
    }

    // Rule 5: Terms (Required)
    if (!termsInput.checked) {
      termsError.textContent = "You must accept the terms.";
      termsError.style.display = 'block';
      isValid = false;
    }
    // --- [END OF VALIDATION LOGIC] ---


    // --- 4. Add to Table if Valid ---
    if (isValid) {
      const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        birthDate: birthDate,
        timestamp: timestampInput.value,
      };

      const row = document.createElement("tr");
      row.className = "even:bg-blue-100"; // 'bg-blue-100' is a light blue

      const formattedDate = new Date(data.timestamp).toLocaleString('en-GB');


      const cell1 = document.createElement("td");
      cell1.textContent = data.fullName;
      cell1.className = "px-4 py-3 text-left"; // Align left
      row.appendChild(cell1);

      const cell2 = document.createElement("td");
      cell2.textContent = data.email;
      cell2.className = "px-4 py-3 text-center"; // Align center
      row.appendChild(cell2);

      const cell3 = document.createElement("td");
      cell3.textContent = data.phone;
      cell3.className = "px-4 py-3 text-center"; // Align center
      row.appendChild(cell3);

      const cell4 = document.createElement("td");
      cell4.textContent = data.birthDate;
      cell4.className = "px-4 py-3 text-center"; // Align center
      row.appendChild(cell4);

      const cell5 = document.createElement("td");
      cell5.textContent = formattedDate;
      cell5.className = "px-4 py-3 text-center"; // Align center
      row.appendChild(cell5);

      tableBody.appendChild(row);
      form.reset();
      fullNameInput.focus();
    }
  });

  // Also clear errors when the form is reset
  form.addEventListener("reset", () => {
    errorElements.forEach((element) => {
      element.textContent = '';
      element.style.display = 'none';
    });
  });
});