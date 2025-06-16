document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");

  // Sample product data
  const products = [
    { id: 1, name: "Wireless Headphones", price: 250, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smart Watch", price: 120, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Bluetooth Speaker", price: 180, image: "https://via.placeholder.com/150" },
    { id: 4, name: "LED Monitor", price: 300, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Gaming Mouse", price: 75, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Laptop Stand", price: 55, image: "https://via.placeholder.com/150" }
  ];

  // Render products to the DOM
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 8px;">
      <h2>${product.name}</h2>
      <p>₦${product.price.toLocaleString()}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(card);
  });

  // Add to Cart functionality
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      const selectedProduct = products.find(p => p.id === productId);
      addToCart(selectedProduct);
    });
  });

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }
});
