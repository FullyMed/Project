// ===============================
// JS for Dashboard.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const upcomingContainer = document.getElementById("upcomingBookings");
  const historyContainer = document.getElementById("bookingHistory");

  const popup = document.getElementById("cancelPopup");
  const cancelText = document.getElementById("cancelText");
  const confirmCancel = document.getElementById("confirmCancel");
  const closePopup = document.getElementById("closePopup");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

  let selectedBooking = null;

  function getCancelKey() {
    const now = new Date();
    return `${loggedInUser.email}-${now.getFullYear()}-${now.getMonth() + 1}`;
  }

  function getCancelRemaining() {
    const cancelCounts = JSON.parse(localStorage.getItem("cancelCounts")) || {};
    const key = getCancelKey();
    return 2 - (cancelCounts[key] || 0);
  }

  function incrementCancelCount() {
    const cancelCounts = JSON.parse(localStorage.getItem("cancelCounts")) || {};
    const key = getCancelKey();
    cancelCounts[key] = (cancelCounts[key] || 0) + 1;
    localStorage.setItem("cancelCounts", JSON.stringify(cancelCounts));
  }

  function renderBookings() {
    const now = new Date();
    const userBookings = allBookings.filter(b => b.email === loggedInUser.email);

    const upcoming = [];
    const history = [];

    userBookings.forEach(b => {
      const bookingDateTime = new Date(`${b.date}T${b.end}`);
      if (bookingDateTime > now) {
        upcoming.push(b);
      } else {
        history.push(b);
      }
    });

    // Upcoming Bookings
    if (upcoming.length === 0) {
      upcomingContainer.innerHTML = "<p>No upcoming bookings.</p>";
    } else {
      const remaining = getCancelRemaining();
      upcomingContainer.innerHTML = "";

      upcoming.forEach((b, index) => {
        const card = document.createElement("div");
        card.className = "booking-card";
        card.innerHTML = `
          <p><strong>Date:</strong> ${b.date}</p>
          <p><strong>Time:</strong> ${b.start} - ${b.end}</p>
          <p><strong>People:</strong> ${b.people}</p>
          ${
            remaining > 0
              ? `<button class="cancelBtn" data-index="${index}" style="margin-top:10px;">Cancel</button>`
              : `<p style="color:red; font-weight:bold;">Cancel limit reached (2/2)</p>`
          }
        `;
        upcomingContainer.appendChild(card);
      });

      document.querySelectorAll(".cancelBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = parseInt(btn.getAttribute("data-index"));
          selectedBooking = upcoming[idx];
          cancelText.textContent = `Are you sure? Cancel Remaining ${getCancelRemaining()}/2`;
          popup.classList.remove("hidden");
        });
      });
    }

    // Booking History
    if (history.length === 0) {
      historyContainer.innerHTML = "<p>No past bookings found.</p>";
    } else {
      historyContainer.innerHTML = history.map(b => `
        <div class="booking-card">
          <p><strong>Date:</strong> ${b.date}</p>
          <p><strong>Time:</strong> ${b.start} - ${b.end}</p>
          <p><strong>People:</strong> ${b.people}</p>
        </div>
      `).join("");
    }
  }

  if (loggedInUser && userInfo) {
    userInfo.innerHTML = `
      <img src="${loggedInUser.avatar}" alt="User Avatar" style="width:100px;height:100px;border-radius:50%;margin-bottom:10px;">
      <p><strong>Name:</strong> ${loggedInUser.name}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
    `;
    renderBookings();
  }

  if (!loggedInUser && userInfo) {
    userInfo.innerHTML = `<p style="color:red;">You are not logged in. Please <a href="Login.html">login</a>.</p>`;
    logoutBtn.style.display = "none";
  }

  // Cancel Logic
  if (confirmCancel) {
    confirmCancel.addEventListener("click", () => {
      allBookings = allBookings.filter(b => {
        return !(
          b.email === loggedInUser.email &&
          b.date === selectedBooking.date &&
          b.start === selectedBooking.start &&
          b.end === selectedBooking.end
        );
      });

      localStorage.setItem("bookings", JSON.stringify(allBookings));
      incrementCancelCount();
      popup.classList.add("hidden");
      renderBookings();
      alert("Booking cancelled successfully.");
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "Login.html";
    });
  }
});