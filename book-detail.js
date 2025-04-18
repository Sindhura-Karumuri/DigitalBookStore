const books = [
    {
      id: "1",
      title: "The Power of Now",
      author: "Eckhart Tolle",
      price: "420",
      image: "https://m.media-amazon.com/images/I/61Ij8nLooNL._AC_UF1000,1000_QL80_.jpg",
      description:
      "The Power of Now is a spiritual guide that teaches you how to live in the present moment and let go of anxiety about the past or future. Eckhart Tolle shares practical teachings to help you find peace, presence, and inner stillness."
    },
    {
      id: "2",
      title: "Educated",
      author: "Tara Westover",
      price: "480",
      image: "https://m.media-amazon.com/images/I/71N2HZwRo3L._UF1000,1000_QL80_.jpg",
      description:
        "Educated is a memoir by Tara Westover, detailing her journey from growing up in a strict and isolated household in rural Idaho to earning a PhD from Cambridge University. It's a powerful story about the importance of education, self-invention, and resilience."
    },
    {
      id: "3",
      title: "Start With Why",
      author: "Simon Sinek",
      price: "450",
      image: "https://m.media-amazon.com/images/I/71M1P287BjL.jpg",
      description:
     "Start With Why explores how leaders can inspire cooperation, trust, and change. Simon Sinek presents a powerful idea: people won't truly buy into a product, service, movement, or idea until they understand the WHY behind it. It's a must-read for anyone looking to lead with purpose."
    },
    {
        "id": "4",
        "title": "Man's Search for Meaning",
        "author": "Viktor E. Frankl",
        "price": "499",
        "image": "https://m.media-amazon.com/images/I/61157LApbuL._AC_UF1000,1000_QL80_.jpg",
        "description": "Man's Search for Meaning is Viktor Frankl's powerful account of his experiences in Nazi concentration camps and how he found meaning in the most horrific of circumstances. The book introduces his theory of Logotherapy, which emphasizes that life's primary drive is not pleasure, but the pursuit of what we find meaningful."
      },
      {
        "id": "5",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": "399",
        "image": "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
        "description": "To Kill a Mockingbird is a classic novel by Harper Lee that explores serious themes of racial injustice, moral growth, and empathy through the eyes of Scout Finch, a young girl in the 1930s South. The story centers around her father, Atticus Finch, a lawyer who defends a black man accused of raping a white woman, and the impact it has on their family and community."
      },
      {
        "id": "6",
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "price": "499",
        "image": "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
        "description": "The Psychology of Money by Morgan Housel delves into the emotional and psychological aspects of personal finance. The book explores how people's attitudes towards money often drive their financial decisions, and how understanding these behaviors can lead to better financial outcomes. It's a thought-provoking read that challenges conventional wisdom about wealth and success."
      }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("bookId");
  
    const book = books.find((b) => b.id === bookId);
  
    if (book) {
      document.getElementById("book-title").textContent = book.title;
      document.getElementById("book-price").textContent = `Rs. ${book.price}`;
      document.getElementById("book-author").textContent = `by ${book.author}`;
      document.getElementById("book-description").textContent = book.description;
      document.getElementById("book-image").src = book.image;
    } else {
      document.querySelector("section").innerHTML = `
        <div class="alert alert-warning text-center">
          Book not found. <a href="ebooks.html">Back to Ebooks</a>
        </div>
      `;
    }
  
    const addToCartBtn = document.querySelector(".add-to-cart");
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  
    if (addToCartBtn && book) {
      addToCartBtn.addEventListener("click", () => {
        cartCount++;
        localStorage.setItem("cartCount", cartCount);
        alert(`${book.title} added to cart!`);
      });
    }
  });
  