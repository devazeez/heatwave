document.addEventListener('DOMContentLoaded', function () {
    // Retrieve product ID from localStorage
    const productId = localStorage.getItem('productId');

    // Check if productId is present
    if (productId) {
        // Construct the URL for fetching product details
        const endpointUrl = `https://heatwave-backend.vercel.app/admin/products/${productId}`;

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
            const name = document.getElementById('name');
            const price = document.getElementById('price');
            const description = document.getElementById('description');

            productImg.src = product.data.primaryImage;
            name.textContent = product.data.name;
            price.textContent = `$${product.data.price}`;
            description.textContent = product.data.description;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    } else {
        console.error('Product ID not found in localStorage.');
    }
});
