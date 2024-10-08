// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-item-container');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button class="delete-button" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
            total += parseFloat(item.price);
        });
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteCartItem(index);
        });
    });
}

// Function to delete an item from the cart
function deleteCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); // Remove the item from the array
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
    updateCartDisplay(); // Refresh the cart display
}

// Function to add item to cart
function addToCart(productId, productName, productPrice) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ id: productId, name: productName, price: productPrice });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const productName = e.target.dataset.productName;
        const productPrice = e.target.dataset.productPrice;
        addToCart(productId, productName, productPrice);
        alert(`${productName} has been added to your cart!`);
    });
});

// Call updateCartDisplay on page load
if (document.getElementById('cart-item-container')) {
    updateCartDisplay();
}
