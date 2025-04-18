document.addEventListener("DOMContentLoaded", () => {
  // Update the cart count on page load
  updateCartCount();

  // Set up book item click listener for book details
  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const bookData = {
        title: item.querySelector("h5").textContent,  // Changed to 'h5' based on the structure
        price: parseFloat(item.querySelector(".card-text").textContent.replace('Rs. ', '')),
        image: item.querySelector("img").src,
        description: "Book description goes here...", // You can update this dynamically
      };

      // Store the selected book data in localStorage
      localStorage.setItem("selectedBook", JSON.stringify(bookData));
    });
  });
});

// This function is for adding an item to the cart
function addToCart(bookId, bookTitle, bookPrice, bookImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage or create an empty array

  console.log("Adding to cart: ", bookId, bookTitle, bookPrice, bookImage);  // Debugging line

  // Check if the book is already in the cart
  const existingBook = cart.find(item => item.bookId === bookId);
  if (existingBook) {
    // If the book is already in the cart, just increase the quantity
    existingBook.quantity += 1;
  } else {
    // Otherwise, add a new book to the cart with quantity 1
    cart.push({ bookId, bookTitle, bookPrice, quantity: 1, image: bookImage });
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Notify the user with a toast instead of an alert (Improvement)
  showToast(`${bookTitle} added to cart!`);
}

// This function updates the cart count in the navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  
  // Set the cart count to the length of the cart
  cartCountElement.textContent = cart.length;

  // Show the cart count badge only if there are items in the cart
  cartCountElement.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

// Function to remove an item from the cart
function removeFromCart(bookId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Filter out the item with the specified bookId
  cart = cart.filter(item => item.bookId !== bookId);

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart count and re-render the cart
  updateCartCount();
  displayCartItems();
}

// Function to render cart items on the cart page
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.getElementById("cart-table-body");
  const cartTotal = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById('empty-cart');
  const cartItems = document.getElementById('cart-items');
  
  // If the cart is empty, show the empty cart message
  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartItems.style.display = 'none';
  } else {
    emptyCartMessage.style.display = 'none';
    cartItems.style.display = 'block';

    // Clear the current table content
    cartTableBody.innerHTML = '';

    let total = 0;

    // Iterate over each item in the cart and display it in the table
    cart.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.bookTitle}" width="50"></td>
        <td>${item.bookTitle}</td>
        <td>Rs. ${item.bookPrice.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${(item.bookPrice * item.quantity).toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.bookId}')">Remove</button></td>
      `;
      cartTableBody.appendChild(row);

      total += item.bookPrice * item.quantity;
    });

    // Update the total price in the cart
    cartTotal.textContent = total.toFixed(2);
  }
}

// Function to show a toast notification
function showToast(message) {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast', 'show');
  toastContainer.textContent = message;
  toastContainer.style.position = 'fixed';
  toastContainer.style.bottom = '20px';
  toastContainer.style.right = '20px';
  toastContainer.style.backgroundColor = '#28a745';
  toastContainer.style.color = 'white';
  toastContainer.style.padding = '10px';
  toastContainer.style.borderRadius = '5px';

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.remove();
  }, 3000); // Remove toast after 3 seconds
}

// Initialize the cart page when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
  }
});
