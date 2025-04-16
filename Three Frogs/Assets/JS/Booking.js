// ===============================
// JS for Booking.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const popup = document.getElementById("authPopup");
    const bookingResult = document.getElementById("bookingResult");
  
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!currentUser && bookingForm) {
      bookingForm.style.display = "none";
      popup.classList.remove("hidden");
    }
  
    if (bookingForm && currentUser) {
      const emailField = document.getElementById("email");
      if (emailField) {
        emailField.value = currentUser.email;
        emailField.readOnly = true;
      }
  
      bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const start = document.getElementById("start-time").value;
        const end = document.getElementById("end-time").value;
        const people = document.getElementById("people").value;
        const openTime = "12:00";
        const closeTime = "22:00";
        const today = new Date().toISOString().split("T")[0];
        if (date < today) {
          bookingResult.innerHTML = `
            <p style="color:red;"><strong>Booking date cannot be in the past.</strong></p>
          `;
          return;
        }
  
        if (end <= start) {
          bookingResult.innerHTML = `
            <p style="color:red;"><strong>End time must be later than start time.</strong></p>
          `;
          return;
        }
  
        if (start < openTime || end > closeTime) {
          bookingResult.innerHTML = `
            <p style="color:red;"><strong>Booking must be between 12:00 and 22:00.</strong></p>
          `;
          return;
        }
  
        const bookingData = {
          name,
          email: currentUser.email,
          date,
          start,
          end,
          people
        };
  
        const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        allBookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(allBookings));
  
        const result = `
          <h3>Booking Confirmed!</h3>
          <p>Thank you, <strong>${name}</strong>.</p>
          <p>Your booking on <strong>${date}</strong> from <strong>${start}</strong> to <strong>${end}</strong> for <strong>${people} people</strong> is received.</p>
          <p>We've sent a confirmation to <strong>${currentUser.email}</strong>.</p>
        `;
  
        bookingResult.innerHTML = result;
        bookingForm.reset();
      });
    }
  });