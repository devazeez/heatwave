import { BASE_URL } from "./variables.js";
const navbarMenu = document.querySelector(".navbar .links");

document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("pay");
  const showPopupButton = document.getElementById("showPopupBtn");
  // const hidePopupBtn = formPopup.querySelector(".close-btn");

  payButton.addEventListener("click", function () {
    // Assuming you are making a POST request to your server endpoint for creating an order
    fetch("https://heatwave-backend.vercel.app/api/user/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Assuming your order data is available in some variable, replace it accordingly
      // body: JSON.stringify(yourOrderData),
    })
      .then((response) => {
        // Check if the response status is 401
        if (response.status === 401) {
          // Redirect to "auth.html"
          window.location.href = "auth.html";
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the server (e.g., update UI, show success message, etc.)
        console.log("Order created successfully:", data);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error creating order:", error);
      });
  });

  // Add a click event listener to the "showPopupBtn" button
  showPopupButton.addEventListener("click", function () {
    // Toggle the visibility of the popup
    document.body.classList.toggle("show-popup");
  });
});

// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     // Make a GET request to fetch the user's cart
//     let authToken = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/admin/settings`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // authorization: `Bearer ${authToken}`,
//         // Include any additional headers if needed
//       },
//       // Include any necessary credentials, mode, etc.
//     });

//     // Check if the response status is okay (status code 200-299)
//     if (response.ok) {
//       // Parse the JSON response
//       const responseData = await response.json();
//       const deliveryFee = responseData.data[0].deliveryAmount;
//       console.log(deliveryFee)
//     } else {
//       // If the response status is not okay, throw an error
//       throw new Error(`Failed to fetch cart. Status: ${response.status}`);
//     }
//   } catch (error) {
//     // Handle any errors that occur during the fetch
//     console.error("Error fetching cart:", error);
//     // Display an error message to the user or take appropriate action
//   }
// });

// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     // Make a GET request to fetch the user's cart
//     let authToken = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/user/cart`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${authToken}`,
//         // Include any additional headers if needed
//       },
//       // Include any necessary credentials, mode, etc.
//     });

//     // Check if the response status is okay (status code 200-299)
//     if (response.ok) {
//       // Parse the JSON response
//       const responseData = await response.json();

//       // Assuming the response data structure is similar to the previous example
//       const cartItems = responseData.data;
//       console.log("Cart Items:", cartItems);
//       // Get the table body element
//       const element = document.querySelector(".small-container.cart-page");
//       const table = document.getElementById("main-table");
//       const cartTableBody = document.createElement("tbody");

//       // Loop through each item in the cart
//       cartItems.forEach((item) => {
//         // Create a new table row for each item

//         const colDiv = document.createElement("tr");
//         colDiv.classList.add("main-row");

//         const product = document.createElement("td");
//         product.classList.add("product");

//         const cartInfo = document.createElement("div");
//         colDiv.classList.add("cart-info");

//         const smallerCartInfo = document.createElement("div");
//         colDiv.classList.add("smaller-cart-info");

//         const quantity = document.createElement("td");
//         colDiv.classList.add("quantity");

//         const colatedPrice = document.createElement("td");
//         colDiv.classList.add("colated-price");

//         // Create table cells for product name, unit, and total amount
//         // const productNameCell = document.createElement("td");
//         // productNameCell.textContent = item.product.name;

//         const productImage = document.createElement("img");
//         productImage.src = item.product.primaryImage;

//         const productName = document.createElement("p");
//         productName.id = "product-name";
//         productName.textContent = item.product.name;

//         const productPrice = document.createElement("small");
//         productPrice.id = "product-price";
//         productPrice.textContent = "Price:" + " ₦" + item.product.price;

//         const remove = document.createElement("a");
//         remove.textContent = "Remove";

//         const unitCell = document.createElement("p");
//         unitCell.id = "unit";
//         unitCell.textContent = item.unit;

//         // const colatedPrice = document.getElementById("colated-price");
//         colatedPrice.textContent = "₦" + item.unit * item.product.price;

//         // const totalAmountCell = document.createElement("td");
//         // const totalAmount = item.product.price * item.unit;
//         // totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`;

//         // Append cells to the new row
//         // newRow.appendChild(productNameCell);
//         // newRow.appendChild(unitCell);
//         // newRow.appendChild(totalAmountCell);

//         // Append the new row to the table body

//         colDiv.appendChild(product);
//         product.appendChild(cartInfo);
//         cartInfo.appendChild(productImage);
//         cartInfo.appendChild(smallerCartInfo);
//         smallerCartInfo.appendChild(productName);
//         smallerCartInfo.appendChild(productPrice);
//         smallerCartInfo.appendChild(remove);
//         quantity.appendChild(unitCell);
//         colDiv.appendChild(quantity);
//         colDiv.appendChild(colatedPrice);
//         cartTableBody.appendChild(colDiv);
//         table.appendChild(cartTableBody);
//       });
//     } else {
//       // If the response status is not okay, throw an error
//       throw new Error(`Failed to fetch cart. Status: ${response.status}`);
//     }
//   } catch (error) {
//     // Handle any errors that occur during the fetch
//     console.error("Error fetching cart:", error);
//     // Display an error message to the user or take appropriate action
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("pay");
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



// document.addEventListener('DOMContentLoaded', async function () {
//   try {
//     // Make a GET request to fetch the user's cart
//     let authToken = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/user/cart`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${authToken}`,
//         // Include any additional headers if needed
//       },
//       // Include any necessary credentials, mode, etc.
//     });

//     if (response.ok) {
//       // Parse the response JSON
//       const items = await response.json();
//       console.log("BAD BOY", items)

//       function createCartElement(key) {
//         return `<div class="item">
//           <img src="${items.data[key].product.primaryImage}">
//           <div class="detail">
//             <h3>${items.product[key].name}</h3>
//             <p style="font-size:16px">x${items.data[key].unit}</p>
//             <p style="font-size:16px">Amount: ${items.data[key].product.amount}</p>
//           </div>
//         </div>`;
//       }

//       let totalAmount = 0;
//       if (items.product && items.product.length > 0) {
//         for (var i = 0; i < items.product.length; ++i) {
//           totalAmount += items.product[i].count * items.product[i].amount;
//           document.getElementById("cart-item-container").innerHTML += createCartElement(i);
//         }
//         document.getElementById("item-count").innerHTML = items.product.length;
//         document.getElementById("total-amount").innerHTML = totalAmount;
//       }

//       document.getElementById("place-order-btn").addEventListener('click', function () {
//         let cart = [];
//         localStorage.setItem("cart-count", "0");
//         localStorage.setItem("cart-item", JSON.stringify(cart));
//       });
//     } else {
//       console.error("Failed to fetch cart data:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error fetching cart data:", error.message);
//   }
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

      function createCartElement(key) {
        return `<div class="item">
          <img src="${items.data[key].product.primaryImage}">
          <div class="detail">
            <h3>${items.data[key].product.name}</h3>
            <p style="font-size:16px">x${items.data[key].unit}</p>
            <p style="font-size:16px">Amount: ${items.data[key].product.price}</p>
          </div>
        </div>`;
      }

      await fetch(`${BASE_URL}/api/admin/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Assuming your order data is available in some variable, replace it accordingly
      })
        .then((response) => {
          // Check if the response status is 401
          if (response.status === 401 || response.status === 500) {
          console.log("Unable to get delivery fee");

          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the server (e.g., update UI, show success message, etc.)
          const deliveryFee = data.data[0].deliveryAmount
          console.log("Order created successfully:", deliveryFee);
          // window.location.href = data.paymentLink;
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch
          console.error("Error creating order:", error);
        });


      let totalAmount = 0;
      if (items.data && items.data.length > 0) {
        for (var i = 0; i < items.data.length; ++i) {
          totalAmount += items.data[i].unit * items.data[i].product.price;
          document.getElementById("cart-item-container").innerHTML +=
            createCartElement(i);
        }
        document.getElementById("item-count").innerHTML = items.data.length;
        document.getElementById("total-amount").innerHTML = totalAmount;
      }

      document
        .getElementById("place-order-btn")
        .addEventListener("click", function () {
          let cart = [];
          localStorage.setItem("cart-count", "0");
          localStorage.setItem("cart-item", JSON.stringify(cart));
        });
    } else {
      console.error("Failed to fetch cart data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
  }
});
