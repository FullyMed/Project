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

  const changeAvatarForm = document.getElementById("changeAvatarForm");
  const avatarMsg = document.getElementById("avatarUpdateMessage");
  const currentAvatar = document.getElementById("currentAvatar");

  const editAvatarBtn = document.getElementById("editAvatarBtn");
  const avatarChangeContainer = document.getElementById("avatarChangeContainer");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let selectedBooking = null;

  if (!loggedInUser) {
    alert("You are not logged in. Redirecting to login page...");
    window.location.href = "Login.html";
    return;
  }

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
    const upcoming = [], history = [];

    userBookings.forEach(b => {
      const bookingDateTime = new Date(`${b.date}T${b.end}`);
      if (bookingDateTime > now) upcoming.push(b);
      else history.push(b);
    });

    // === Upcoming Bookings ===
    upcomingContainer.innerHTML = upcoming.length === 0 ? "<p>No upcoming bookings.</p>" : "";
    const remaining = getCancelRemaining();

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
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        selectedBooking = upcoming[idx];
        cancelText.textContent = `Are you sure? Cancel Remaining ${getCancelRemaining()}/2`;
        popup.classList.remove("hidden");
      });
    });

    // === Booking History ===
    historyContainer.innerHTML = history.length === 0
      ? "<p>No past bookings found.</p>"
      : history.map(b => `
        <div class="booking-card">
          <p><strong>Date:</strong> ${b.date}</p>
          <p><strong>Time:</strong> ${b.start} - ${b.end}</p>
          <p><strong>People:</strong> ${b.people}</p>
        </div>
      `).join("");
  }

  // === User Info & Avatar Display ===
  function updateUserInfo() {
    userInfo.innerHTML = `
      <img src="${loggedInUser.avatar}" alt="User Avatar" style="width:100px;height:100px;border-radius:50%;margin-bottom:10px;">
      <p><strong>Name:</strong> ${loggedInUser.name}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
    `;
    if (currentAvatar) currentAvatar.src = loggedInUser.avatar;
  }

  // === Show/hide avatar change container ===
  if (editAvatarBtn && avatarChangeContainer) {
    editAvatarBtn.addEventListener("click", () => {
      avatarChangeContainer.classList.toggle("hidden");
    });
  }

  // === Avatar Change Logic ===
  if (changeAvatarForm) {
    changeAvatarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newAvatar = document.querySelector('input[name="newAvatar"]:checked').value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const index = users.findIndex(u => u.email === loggedInUser.email);
      if (index !== -1) {
        users[index].avatar = newAvatar;
        localStorage.setItem("users", JSON.stringify(users));

        loggedInUser.avatar = newAvatar;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        updateUserInfo();
        avatarMsg.innerHTML = `<p style="color:green;">Avatar updated successfully!</p>`;
        setTimeout(() => {
          avatarMsg.innerHTML = "";
        }, 3000);
      }
    });
  }

  // === Cancel Confirm / Close
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

  // === Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "Login.html";
    });
  }

  // === Init
  updateUserInfo();
  renderBookings();
});