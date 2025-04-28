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

    bookingForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const date = document.getElementById("date").value;
      const start = document.getElementById("start-time").value;
      const end = document.getElementById("end-time").value;
      const people = document.getElementById("people").value;

      const openTime = "12:00";
      const closeTime = "22:00";
      const today = new Date().toISOString().split("T")[0];

      if (date < today) {
        bookingResult.innerHTML = `<p style="color:red;"><strong>Booking date cannot be in the past.</strong></p>`;
        return;
      }

      if (end <= start) {
        bookingResult.innerHTML = `<p style="color:red;"><strong>End time must be later than start time.</strong></p>`;
        return;
      }

      if (start < openTime || end > closeTime) {
        bookingResult.innerHTML = `<p style="color:red;"><strong>Booking must be between 12:00 and 22:00.</strong></p>`;
        return;
      }

      try {
        const response = await fetch("booking.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email: currentUser.email,
            date,
            start,
            end,
            people
          })
        });

        const result = await response.json();

        if (result.success) {
          bookingResult.innerHTML = `
            <h3>Booking Confirmed!</h3>
            <p>Thank you, <strong>${name}</strong>.</p>
            <p>Your booking on <strong>${date}</strong> from <strong>${start}</strong> to <strong>${end}</strong> for <strong>${people} people</strong> is received.</p>
            <p>We've sent a confirmation to <strong>${currentUser.email}</strong>.</p>
          `;
          bookingForm.reset();
          loadUpcomingBookings();
        } else {
          bookingResult.innerHTML = `<p style="color:red;">${result.error}</p>`;
        }
      } catch (error) {
        console.error(error);
        bookingResult.innerHTML = `<p style="color:red;">Server error. Please try again later.</p>`;
      }
    });

    loadUpcomingBookings();
  }

  // ===============================
  // Function for Load Upcoming Bookings
  // ===============================
  async function loadUpcomingBookings() {
    const upcomingContainer = document.getElementById("upcomingBookings");

    if (!upcomingContainer || !currentUser) return;

    try {
      const response = await fetch("get_bookings.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(currentUser.email)}`
      });

      const result = await response.json();

      if (result.success) {
        if (result.bookings.length === 0) {
          upcomingContainer.innerHTML = "<p>No upcoming bookings.</p>";
          return;
        }

        upcomingContainer.innerHTML = "";

        result.bookings.forEach((booking, index) => {
          const bookingItem = document.createElement("div");
          bookingItem.className = "booking-item";
          bookingItem.innerHTML = `
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.start} - ${booking.end}</p>
            <p><strong>People:</strong> ${booking.people}</p>
            <button class="cancelBookingBtn" data-date="${booking.date}" data-start="${booking.start}" data-end="${booking.end}">Cancel</button>
          `;
          upcomingContainer.appendChild(bookingItem);
        });

        document.querySelectorAll(".cancelBookingBtn").forEach(button => {
          button.addEventListener("click", cancelBooking);
        });

      } else {
        upcomingContainer.innerHTML = `<p style="color:red;">${result.error}</p>`;
      }
    } catch (error) {
      console.error(error);
      upcomingContainer.innerHTML = `<p style="color:red;">Failed to load bookings.</p>`;
    }
  }

  // ===============================
  // Function for Cancel Booking
  // ===============================
  async function cancelBooking(event) {
    const button = event.target;
    const date = button.dataset.date;
    const start = button.dataset.start;
    const end = button.dataset.end;

    if (!confirm(`Are you sure you want to cancel booking on ${date} from ${start} to ${end}?`)) {
      return;
    }

    try {
      const response = await fetch("cancel_booking.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(currentUser.email)}&date=${encodeURIComponent(date)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
      });

      const result = await response.json();

      if (result.success) {
        alert("Booking cancelled successfully.");
        loadUpcomingBookings();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking.");
    }
  }
});