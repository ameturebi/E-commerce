let Total = document.querySelector('.total');
let listCart = document.querySelector('.listCart');
let iconCart = document.querySelector('#cartIcon');
let iconCartSpan = document.querySelector('.badge');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let checkOutButton = document.querySelector('.checkOut');
let paymentCheckbox = document.querySelector('#paymentCheckbox');
let paymentOptions = document.getElementById('paymentOptions');
let paymentMethods = document.getElementById('paymentMethods');
let successMessage = document.querySelector('.success-message');
let cancelButton = document.getElementById('cancelButton');
let payButton = document.getElementById('payButton');
let Addcart = document.querySelectorAll('.btn');
let cart = [];

// Toggle cart display
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add items to cart
Addcart.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        addToCart(id, name, price, image);
    });
});

const addToCart = (id, name, price, image) => {
    const currentItem = cart.find(item => item.id === id);
    if (currentItem) {
        currentItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    updateCart();
};

const updateCart = () => {
    listCart.innerHTML = '';
    let total = 0;
    let totalItems = 0;
    cart.forEach(item => {
        listCart.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>${item.name} - $${item.price} x ${item.quantity}</div>
                <button class="remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });
    Total.textContent = `Total: $${total.toFixed(2)}`;
    iconCartSpan.textContent = totalItems;
};

// Remove item from cart
listCart.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove') || event.target.closest('.remove')) {
        const id = event.target.closest('.remove').getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
});

// Show payment options only when checkout button is clicked
checkOutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        paymentOptions.style.display = 'block';
    } else {
        alert("Your cart is empty!");
    }
});

// Show payment methods only if checkbox is checked
paymentCheckbox.addEventListener('change', function() {
    paymentMethods.style.display = this.checked ? 'block' : 'none';
});

// Cancel button functionality
cancelButton.addEventListener('click', () => {
    paymentOptions.style.display = 'none';
    paymentCheckbox.checked = false;
    paymentMethods.style.display = 'none';

    listCart.innerHTML = '';
   Total.textContent = 'Total: $0.00';
});

// Payment confirmation and success message
payButton.addEventListener('click', () => {
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
        paymentOptions.style.display = 'none';
        body.classList.toggle('showCart'); // Close the cart
        paymentCheckbox.checked = false; // Reset the checkbox
        paymentMethods.style.display = 'none'; // Hide payment methods
        cart = []; // Clear the cart
        updateCart(); // Update the cart display
    }, 3000);
});
