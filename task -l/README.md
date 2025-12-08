# City Cycle Rentals - README

## Project Overview
City Cycle Rentals is a bike rental website for Kokkola, Finland. The website features a landing page, catalog page, and order form for customers to book bike rentals.

**Author:** Md Abdullah Ibne Shahid Nur  
**Date:** 2025-12-04  
**Last Updated:** 2025-12-08

---

## Recent Fix: Date Field Width Adjustment

### Issue Description
The Start Date and End Date input fields on the order page (`order.html`) were appearing too narrow, making them difficult to interact with and visually inconsistent with the rest of the form.

### Solution Implemented
Modified the CSS styling to ensure the date fields display at full width within their container, matching the width of other form inputs.

#### Files Modified
- **[styles.css](file:///Users/afifaabdullah/Desktop/task%20-l/styles.css)** (Lines 402-428)
- **[order.html](file:///Users/afifaabdullah/Desktop/task%20-l/order.html)** (Lines 77-87)

#### Changes Made

**CSS Changes (styles.css):**
```css
.form-group-inline {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: nowrap;
  margin-top: 0.25rem;
  align-items: flex-start;
}

.form-group-inline > div {
  flex: 1 1 0;        /* Equal width for both fields */
  min-width: 0;       /* Allow fields to shrink if needed */
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

/* Ensure the input fills its container */
.form-group-inline input {
  width: 100%;
}
```

**HTML Structure (order.html):**
```html
<div class="form-group form-group-inline">
  <div>
    <label for="startDate">Start date</label>
    <input type="date" id="startDate" name="startDate" required>
  </div>

  <div>
    <label for="endDate">End date</label>
    <input type="date" id="endDate" name="endDate" required>
  </div>
</div>
```

### Technical Details

The fix utilizes **CSS Flexbox** to create a responsive inline layout:

1. **Parent Container (`.form-group-inline`):**
   - Uses `display: flex` with `flex-direction: row` to place fields side by side
   - `gap: 1.5rem` provides consistent spacing between the two date fields
   - `flex-wrap: nowrap` ensures fields stay on the same line

2. **Child Containers (`.form-group-inline > div`):**
   - `flex: 1 1 0` makes both date field containers equal width
   - `min-width: 0` allows fields to shrink responsively if needed
   - Each div maintains `display: flex` with `flex-direction: column` for label/input stacking

3. **Input Fields (`.form-group-inline input`):**
   - `width: 100%` ensures the date input fills its parent container completely
   - This prevents the inputs from being narrower than their allocated space

### Result
✅ Date fields now display at full width within their containers  
✅ Both Start Date and End Date fields have equal width  
✅ Fields remain responsive and maintain proper spacing  
✅ Visual consistency with other form inputs is maintained

---

## Project Structure

```
task -l/
├── index.html          # Landing page
├── catalog.html        # Bike catalog page
├── order.html          # Rental order form
├── thanks.html         # Thank you page
├── styles.css          # Main stylesheet
├── script.js           # Form validation JavaScript
├── cycle-1.webp        # Product images
├── cycle-2.webp
├── cycle-3.webp
├── cycle-4.webp
├── cycle-5.webp
├── cycle-6.webp
├── cycle-7.webp
├── cycle.webp
├── example.webp        # Example/demo image
└── brand-intro.mp4     # Brand introduction video
```

---

## Color Scheme

The website uses a vibrant color palette:

- **Primary Yellow:** `#ffb703` (Header/Footer background)
- **Dark Blue:** `#023047` (Headings, buttons, navigation hover)
- **Orange:** `#fb8500` (Accent color)
- **Light Blue:** `#219ebc` (Section headings)
- **Sky Blue:** `#8ecae6` (CTA background)
- **Light Gray:** `#edf6f9` (Section backgrounds)

---

## Contact Information

📍 **Address:** Köydenpunojankatu 1, Kokkola  
📞 **Phone:** +358451563888  
📧 **Email:** info@citycyclerentals.com

---

## Browser Compatibility

The website is built with modern HTML5, CSS3, and JavaScript. It is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Future Improvements

- Add backend integration for form submission
- Implement payment processing
- Add user authentication for booking history
- Create admin panel for bike inventory management
- Add multi-language support (Finnish/English)

---

© 2025 City Cycle Rentals. All rights reserved.
