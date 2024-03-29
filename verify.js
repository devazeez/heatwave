import { BASE_URL } from './variables.js';
import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", async function () {
    try {
      // Extract ref and authToken from the URL and localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('reference');
      const authToken = localStorage.getItem('authToken');
  
      // Check if ref is present
      if (ref) {
        // Construct the URL for verifying the order
        const endpointUrl = `${BASE_URL}/api/user/orders/verify?ref=${ref}`;
  
        // Fetch order verification details from the endpoint
        const response = await fetch(endpointUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
  
        if (response.status === 200) {
          // Display the body tag on the HTML page
          document.body.style.display = "block";

          setTimeout(function () {
            window.location.href = "index.html";
          }, 3000);

        } else {
          console.error("Order verification unsuccessful. Status code:", response.status);
          // showToast("Order verification unsuccessful", "error");
        }
      } else {
        console.error("Ref not found in the URL.");
        // showToast("Order verification unsuccessful", "error");
        document.body.style.display = "none";

      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  