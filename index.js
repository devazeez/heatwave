
// import { config } from './variables.js';
// import { showToast } from './toast.js';
function addCommas(number) {
  return number.toLocaleString();
}




document.addEventListener("DOMContentLoaded", function () {
  // The endpoint URL to fetch data
  const endpointUrl = "https://heatwave-backend.vercel.app/api/admin/products";

  fetch(endpointUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((responseData) => {
      const products = responseData.data; // Access the 'data' property containing products
      const productContainer = document.getElementById("product-container");

      // Filter products where isLatestproduct is true
      const latestProducts = products.filter(
        (product) => product.isLatestProduct === true
      );
      console.log(latestProducts);

      // Loop through each latest product
      latestProducts.forEach((product) => {
        // Create a new col-4 div for each product
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4");

        // Create an anchor element for the product
        const anchor = document.createElement("a");
        anchor.href = "products-details.html"; // Construct the URL with product ID
        anchor.onclick = function () {
          localStorage.setItem("productId", product._id); // Store the product ID in localStorage
        };
        colDiv.appendChild(anchor);

        // Create an image element and set the src attribute to the product's primaryImage
        const image = document.createElement("img");
        image.src = product.primaryImage; // Assuming 'primaryImage' contains the image URL
        anchor.appendChild(image);

        // Create a heading element for the product description
        const heading = document.createElement("h4");
        heading.classList.add("name");
        heading.textContent = product.name; // Assuming 'name' contains the product description
        colDiv.appendChild(heading);

        // Create a paragraph element for the product price
        const priceParagraph = document.createElement("p");
        priceParagraph.classList.add("price");
        priceParagraph.textContent = "₦ " + addCommas(product.price); // Assuming 'price' contains the product price
        colDiv.appendChild(priceParagraph);

        // Append the col-4 div to the product container
        productContainer.appendChild(colDiv);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
