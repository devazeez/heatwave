import { BASE_URL } from "./variables.js";
import { showToast } from "./toast.js";

const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// Show mobile menu
// hamburgerBtn.addEventListener("click", () => {
//     navbarMenu.classList.toggle("show-menu");
// });

// Hide mobile menu
// hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
// hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
});

// SIGN UP
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
      fullName: document.getElementById("fullName").value,
      phoneNumber: document.getElementById("mobileNumber").value,
      emailAddress: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPassword").value,
      // Add more fields as needed
    };

    try {
      console.log(formData);

      // Make a POST request to your API endpoint
      const response = await fetch(`${BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // const data = await response.json();
        const successMessage = data.message; // Replace 'message' with the actual key in your API response
        showToast(successMessage, "success");
        // localStorage.setItem("authToken", data.token)
        setTimeout(function () {
          window.location.href = "auth.html";
        }, 2200);

        return;
      } else {
        // const data = await response.json();
        const errorMessage = data.message;
        console.error("Error response:", errorMessage);
        showToast(errorMessage, "error");
      }
      // Handle the response from the server (e.g., show success message, redirect, etc.)
      // console.log("Signup successful:", errorMessage);
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error during signup:", error);
      showToast(error, "error");
    }
  });
});

//  LOGIN

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect login form data
    const loginData = {
      emailAddress: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    try {
      // Make a POST request to your login API endpoint
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        const successMessage = data.message; // Replace 'message' with the actual key in your API response
        showToast(successMessage, "success");
        window.location.href = "index.html";
        localStorage.setItem("authToken", data.token);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        console.error("Error response:", errorData);
        showToast(errorMessage, "error");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      showToast("Unauthorized", "error");
      console.error("Fetch error:", error);
    }
  });
});
