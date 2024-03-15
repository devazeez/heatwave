import { BASE_URL } from "./variables.js";
const navbarMenu = document.querySelector(".navbar .links");
function addCommas(number) {
  return number.toLocaleString();
}
// document.addEventListener("DOMContentLoaded", function () {
//   const payButton = document.getElementById("pay");
//   const showPopupButton = document.getElementById("showPopupBtn");
//   // const hidePopupBtn = formPopup.querySelector(".close-btn");

//   payButton.addEventListener("click", function () {
//     // Assuming you are making a POST request to your server endpoint for creating an order
//     fetch(`${BASE_URL}/api/user/order`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Assuming your order data is available in some variable, replace it accordingly
//       // body: JSON.stringify(yourOrderData),
//     })
//       .then((response) => {
//         // Check if the response status is 401
//         if (response.status === 401) {
//           // Redirect to "auth.html"
//           window.location.href = "auth.html";
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle the response from the server (e.g., update UI, show success message, etc.)
//         console.log("Order created successfully:", data);
//       })
//       .catch((error) => {
//         // Handle any errors that occur during the fetch
//         console.error("Error creating order:", error);
//       });
//   });

//   // Add a click event listener to the "showPopupBtn" button
//   showPopupButton.addEventListener("click", function () {
//     // Toggle the visibility of the popup
//     document.body.classList.toggle("show-popup");
//   });
// });

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Make a GET request to fetch the user's cart
    let authToken = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/api/user/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
        // Include any additional headers if needed
      },
      // Include any necessary credentials, mode, etc.
    });

    if (response.ok) {
      // Parse the response JSON
      const items = await response.json();
      console.log("BAD BOY", items);

      // Define createCartElement function
      function createCartElement(key) {
        return `<div class="item">
          <img src="${items.data[key].product.primaryImage}">
          <div class="detail">
            <h3>${items.data[key].product.name}</h3>
            <p style="font-size:16px">x${items.data[key].unit}</p>
            <p style="font-size:16px">Amount: ₦${addCommas(items.data[key].product.price)}</p>
          </div>
        </div>`;
      }

      // Fetch delivery fee
      const settingsResponse = await fetch(`${BASE_URL}/api/admin/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!settingsResponse.ok) {
        console.log("Unable to get delivery fee");
      } else {
        const settingsData = await settingsResponse.json();
        const deliveryFee = settingsData.data[0].deliveryAmount;

        // Update delivery fee on the UI
        document.getElementById("delivery-amount").innerHTML = addCommas(deliveryFee);

        let totalAmount = 0;
        if (items.data && items.data.length > 0) {
          for (var i = 0; i < items.data.length; ++i) {
            totalAmount += items.data[i].unit * items.data[i].product.price;
            document.getElementById("cart-item-container").innerHTML += createCartElement(i);
          }

          // Update total amount and total amount including delivery fee on the UI
          document.getElementById("item-count").innerHTML = items.data.length;
          document.getElementById("amount").innerHTML = addCommas(totalAmount);
          document.getElementById("total-amount").innerHTML = addCommas(totalAmount + deliveryFee);
        }

        // Event listener for place order button
        document.getElementById("place-order-btn").addEventListener("click", function () {
          let cart = [];
          localStorage.setItem("cart-count", "0");
          localStorage.setItem("cart-item", JSON.stringify(cart));
        });
      }
    } else {
      console.error("Failed to fetch cart data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("place-order-btn");
  const showPopupButton = document.getElementById("showPopupBtn");
  let authToken = localStorage.getItem("authToken");

  payButton.addEventListener("click", async function () {
    try {
      // Make a GET request to fetch the user's cart
      const cartResponse = await fetch(`${BASE_URL}/api/user/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
          // Include any additional headers if needed
        },
        // Include any necessary credentials, mode, etc.
      });

      // Handle the response from the server for the user's cart
      const cartData = await cartResponse.json();
      console.log("Cart fetched successfully:", cartData);

      // Update the cart data with "address" property
      const updatedCartData = updateCartWithAddress(cartData.data);
      console.log("New Cart fetched successfully:", updatedCartData);


      // Continue with the rest of your logic, e.g., creating the order
      await fetch(`${BASE_URL}/api/user/orders/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        // Assuming your order data is available in some variable, replace it accordingly
        body: JSON.stringify(updatedCartData),
      })
        .then((response) => {
          // Check if the response status is 401
          if (response.status === 401 || response.status === 500) {
            // Redirect to "auth.html"
            // window.location.href = "auth.html";
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the server (e.g., update UI, show success message, etc.)
          console.log("Order created successfully:", data);
          window.location.href = data.paymentLink;
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch
          console.error("Error creating order:", error);
        });
    } catch (error) {
      // Handle any errors that occur during the fetch for the user's cart
      console.error("Error fetching cart:", error);
      // Display an error message to the user or take appropriate action
    }
  });

  // Add a click event listener to the "showPopupBtn" button
  showPopupButton.addEventListener("click", function () {
    // Toggle the visibility of the popup
    document.body.classList.toggle("show-popup");
  });

  // Function to add "address" property to each item in the cart
  function updateCartWithAddress(cart) {
    return cart.map((item) => ({
      _id: item.product._id,
      unit: item.unit,
      address: "Lagos, Nigeria",
    }));
  }
});
