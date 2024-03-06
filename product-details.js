function addCommas(number) {
    return number.toLocaleString();
  }
  


document.addEventListener('DOMContentLoaded', function () {
    // Retrieve product ID from localStorage
    const productId = localStorage.getItem('productId');

    // Check if productId is present
    if (productId) {
        // Construct the URL for fetching product details
        const endpointUrl = `https://heatwave-backend.vercel.app/api/admin/products/${productId}`;

        // Fetch product details from the endpoint
        fetch(endpointUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(product => {
            // Populate product details
            const productImg = document.getElementById('productImg');
            const secondImg = document.getElementById('secondImg');
            const thirdImg = document.getElementById('thirdImg');
            const mainImg = document.getElementById('mainImg');
            
  
            const name = document.getElementById('name');
            const price = document.getElementById('price');
            const description = document.getElementById('description');
            const productPrice = addCommas(product.data.price)
  



            productImg.src = product.data.primaryImage;
            secondImg.src = product.data.secondImage;
            thirdImg.src = product.data.thirdImage;
            mainImg.src = product.data.primaryImage;


            name.textContent = product.data.name;
            price.textContent = `₦${productPrice}`;
            description.textContent = product.data.description;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    } else {
        console.error('Product ID not found in localStorage.');
    }
});


// 


const addToCartBtn = document.querySelector('.btn');

addToCartBtn.addEventListener('click', async () => {
    // Get product id and unit from local storage
    const productId = localStorage.getItem('productId');
    const unit = document.querySelector('.unit').value;

    // Get auth token from local storage
    const authToken = localStorage.getItem('authToken');

    // Check if authToken is present
    if (!authToken) {
        // Redirect user to /auth.html
        window.location.href = '/auth.html';
        return;
    }

    // Prepare data for the POST request
    const data = {
        productId: productId,
        unit: unit
    };

    try {
        // Make the POST request only if authToken is present
        const response = await fetch('http://localhost:3000/api/user/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        });

        // Check the response status
        if (response.status === 401) {
            // Redirect user to /auth.html
            window.location.href = '/auth.html';
        } else if (response.ok) {
            // Cart added successfully
            console.log('Added to cart successfully!');
        } else {
            console.error('Failed to add to cart.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
