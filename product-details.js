import { showToast } from "./toast.js";
import { BASE_URL } from './variables.js';

function addCommas(number) {
  return number.toLocaleString();
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve product ID from localStorage
  const productId = localStorage.getItem("productId");

  // Check if productId is present
  if (productId) {
    // Construct the URL for fetching product details
    const endpointUrl = `${BASE_URL}/api/admin/products/${productId}`;

    // Fetch product details from the endpoint
    fetch(endpointUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((product) => {
        // Populate product details
        const productImg = document.getElementById("productImg");
        const secondImg = document.getElementById("secondImg");
        const thirdImg = document.getElementById("thirdImg");
        const mainImg = document.getElementById("mainImg");

        const name = document.getElementById("name");
        const price = document.getElementById("price");
        const description = document.getElementById("description");
        const productPrice = addCommas(product.data.price);

        productImg.src = product.data.primaryImage;
        secondImg.src = product.data.secondImage;
        thirdImg.src = product.data.thirdImage;
        mainImg.src = product.data.primaryImage;

        name.textContent = product.data.name;
        price.textContent = `₦${productPrice}`;
        description.textContent = product.data.description;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  } else {
    console.error("Product ID not found in localStorage.");
  }
});

//

const addToCartBtn = document.querySelector(".btn");

addToCartBtn.addEventListener("click", async () => {
  // Get product id and unit from local storage
  const productId = localStorage.getItem("productId");
  const unit = document.querySelector(".unit").value;

  // Get auth token from local storage
  const authToken = localStorage.getItem("authToken");

  // Check if authToken is present
  if (!authToken) {
    // Redirect user to /auth.html
    showToast("Kindly Login to Add item to Cart", "error");

    // Wait for 2 seconds (you can adjust the time as needed)
    setTimeout(function () {
      window.location.href = "auth.html";
    }, 3000);

    return;
  }

  // Prepare data for the POST request
  const data = {
    _id: productId,
    unit: unit,
  };

  try {
    // Make the POST request only if authToken is present
    const response = await fetch(`${BASE_URL}/api/user/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    });

    // Check the response status
    if (response.status !== 200) {
      // Redirect user to /auth.html
      window.location.href = "auth.html";
    } else if (response.status === 200) {
      // Cart added successfully
      console.log("Successfully updated cart items");
      showToast("Item added to cart", "success");
    } else {
      console.error("Failed to add to cart.");
      showToast("Failed to add to cart.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
  }s
});
