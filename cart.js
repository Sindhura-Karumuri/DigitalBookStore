// Function to display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;
    cartItemsContainer.innerHTML = ''; // Clear previous cart items
  
    // Loop through the cart and display each item
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const cartItem = document.createElement('div');
      cartItem.classList.add('row', 'mb-4');
      cartItem.innerHTML = `
        <div class="col-md-8">
          <h5>${item.title}</h5>
          <p>Price: Rs. ${item.price}</p>
          <p>Quantity: <span id="quantity-${index}">${item.quantity}</span></p>
        </div>
        <div class="col-md-4 text-end">
          <p>Total: Rs. ${itemTotal}</p>
          <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    // Update the total price
    cartTotalElement.textContent = total;
  }
  
  // Function to remove an item from the cart
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
    displayCart(); // Refresh the cart display
  }
  
  // Function to handle the checkout (this can be enhanced with actual checkout logic)
  document.getElementById('checkout-button').addEventListener('click', function() {
    alert('Proceeding to Checkout...');
    // You can redirect to a checkout page or handle the checkout logic here
  });
  
  // Call displayCart when the page loads to show the cart items
  document.addEventListener('DOMContentLoaded', function() {
    displayCart();
  });
  