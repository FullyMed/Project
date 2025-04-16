// ===============================
// JS for Dashboard.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const userInfo = document.getElementById("userInfo");
    const logoutBtn = document.getElementById("logoutBtn");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (userInfo && loggedInUser) {
      userInfo.innerHTML = `
        <img src="${loggedInUser.avatar}" alt="User Avatar" style="width:100px;height:100px;border-radius:50%;margin-bottom:10px;">
        <p><strong>Name:</strong> ${loggedInUser.name}</p>
        <p><strong>Email:</strong> ${loggedInUser.email}</p>
      `;
    } else if (userInfo && !loggedInUser) {
      userInfo.innerHTML = `
        <p style="color:red;">You are not logged in. Please <a href="Login.html">login</a>.</p>
      `;
      logoutBtn.style.display = "none";
    }
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        window.location.href = "Login.html";
      });
    }
  });