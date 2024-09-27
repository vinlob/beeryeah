let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;

function addToCart(productName, price) {
    cart.push({ productName, price });
    total += price;
    updateLocalStorage();
    updateCartDisplay();
}

function removeFromCart(index) {
    // Only remove item if the total is not already zero
    if (cart.length > 0) {
        total -= cart[index].price; // Deduct the price from total
        cart.splice(index, 1); // Remove item from cart
        total = Math.max(total, 0); // Ensure total does not go negative
        updateLocalStorage();
        updateCartDisplay();
    }
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    cartItemsDiv.innerHTML = ''; // Clear existing items

    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.productName} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceSpan.innerText = total.toFixed(2);
}

// Populate Cart Page
window.onload = function() {
    updateCartDisplay();
};

// Placeholder function for checkout (expand as needed)
function checkout() {
    alert('Checkout feature coming soon!');
}
