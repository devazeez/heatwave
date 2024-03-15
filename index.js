import { BASE_URL } from './variables.js';
// import { config } from './variables.js';
// import { showToast } from './toast.js';
function addCommas(number) {
  return number.toLocaleString();
}


document.addEventListener("DOMContentLoaded", function () {
  // The endpoint URL to fetch data
  const endpointUrl = `${BASE_URL}/api/admin/products`;

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
      const featuredContainer = document.getElementById("featured-container");


      // Filter products where isLatestproduct is true
      const featuredProducts = products.filter(
        (product) => product.category === "featured"
      );

      const latestProducts = products.filter(
        (product) => product.isLatestProduct === true
      );

      // Sort latest products by createdAt date in descending order
      featuredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      latestProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Select only the first three latest products
      const threeFeaturedProducts = featuredProducts.slice(0, 3);
      console.log(threeFeaturedProducts)
     
      const threeLatestProducts = latestProducts.slice(0, 3);
      console.log(threeLatestProducts)

      threeFeaturedProducts.forEach((product) => {
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
        priceParagraph.textContent = product.currency + " " + addCommas(product.price); // Assuming 'price' contains the product price and 'currency' contains the currency symbol
        colDiv.appendChild(priceParagraph);

        // Append the col-4 div to the product container
        featuredContainer.appendChild(colDiv);
      });



      // Loop through each latest product
      threeLatestProducts.forEach((product) => {
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
        priceParagraph.textContent = product.currency + " " + addCommas(product.price); // Assuming 'price' contains the product price and 'currency' contains the currency symbol
        colDiv.appendChild(priceParagraph);

        // Append the col-4 div to the product container
        productContainer.appendChild(colDiv);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
