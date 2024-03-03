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

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Make a GET request to fetch the user's cart
    let authToken = localStorage.getItem("authToken");
    const response = await fetch("https://heatwave-backend.vercel.app/api/user/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
        // Include any additional headers if needed
      },
      // Include any necessary credentials, mode, etc.
    });

    // Check if the response status is okay (status code 200-299)
    if (response.ok) {
      // Parse the JSON response
      const responseData = await response.json();

      // Assuming the response data structure is similar to the previous example
      const cartItems = responseData.data;
      console.log("Cart Items:", cartItems);
      // Get the table body element
      const element = document.querySelector('.small-container.cart-page');
      const table = document.getElementById("main-table")
      const cartTableBody = document.createElement("tbody");

      // Loop through each item in the cart
      cartItems.forEach((item) => {
        // Create a new table row for each item
        

        const colDiv = document.createElement("tr");
        colDiv.classList.add('main-row');

        const product = document.createElement("td");
        product.classList.add('product');

        const cartInfo = document.createElement("div");
        colDiv.classList.add('cart-info');

        const smallerCartInfo = document.createElement("div");
        colDiv.classList.add('smaller-cart-info');

        const quantity = document.createElement("td");
        colDiv.classList.add('quantity');

        const colatedPrice = document.createElement("td");
        colDiv.classList.add('colated-price');

        // Create table cells for product name, unit, and total amount
        // const productNameCell = document.createElement("td");
        // productNameCell.textContent = item.product.name;

        const productImage = document.createElement("img");
        productImage.src = item.product.primaryImage;

        const productName = document.createElement("p");
        productName.id = 'product-name'
        productName.textContent = item.product.name;

        const productPrice = document.createElement("small");
        productPrice.id = 'product-price'
        productPrice.textContent = 'Price:'+ ' ₦' + item.product.price;

        const remove = document.createElement("a");
        remove.textContent = "Remove";

        const unitCell = document.createElement("p");
        unitCell.id = 'unit'
        unitCell.textContent = item.unit;


        // const colatedPrice = document.getElementById("colated-price");
        colatedPrice.textContent = '₦' + item.unit * item.product.price

        // const totalAmountCell = document.createElement("td");
        // const totalAmount = item.product.price * item.unit;
        // totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`;

        // Append cells to the new row
        // newRow.appendChild(productNameCell);
        // newRow.appendChild(unitCell);
        // newRow.appendChild(totalAmountCell);

        // Append the new row to the table body

        colDiv.appendChild(product);
        product.appendChild(cartInfo);
        cartInfo.appendChild(productImage);
        cartInfo.appendChild(smallerCartInfo);
        smallerCartInfo.appendChild(productName);
        smallerCartInfo.appendChild(productPrice);
        smallerCartInfo.appendChild(remove);
        quantity.appendChild(unitCell);
        colDiv.appendChild(quantity);
        colDiv.appendChild(colatedPrice);
        cartTableBody.appendChild(colDiv);
        table.appendChild(cartTableBody)
        
      });
    } else {
      // If the response status is not okay, throw an error
      throw new Error(`Failed to fetch cart. Status: ${response.status}`);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching cart:", error);
    // Display an error message to the user or take appropriate action
  }
});
