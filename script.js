// Menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Newsletter
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input").value;
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }
  alert(`Thanks for subscribing, ${email}!`);
  this.reset();
});

// Scroll reveal
const animateItems = document.querySelectorAll(".animate");
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  animateItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < windowHeight - 50) {
      item.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// 🛒 Cart logic
let cart = [];

const productButtons = document.querySelectorAll(".product-card button");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

productButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector("p").innerText.replace("$", ""));
    addToCart({ name, price });
  });
});

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Cart icon toggle
document.getElementById("cart-icon").addEventListener("click", () => {
  cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
});

document.getElementById("close-cart").addEventListener("click", () => {
  cartModal.style.display = "none";
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  updateCartUI();
});
// Product filtering/sorting/searching
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-select");
const productGrid = document.querySelector(".product-grid");
let productCards = Array.from(document.querySelectorAll(".product-card"));

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  let filtered = productCards;

  // Filter by search text
  if (search) {
    filtered = filtered.filter(card =>
      card.dataset.name.toLowerCase().includes(search)
    );
  }

  // Filter by category
  if (category !== "all") {
    filtered = filtered.filter(card => card.dataset.category === category);
  }

  // Sort
  const sortBy = sortSelect.value;
  if (sortBy === "low") {
    filtered.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if (sortBy === "high") {
    filtered.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
  }

  // Display filtered products
  productGrid.innerHTML = "";
  filtered.forEach(card => productGrid.appendChild(card));
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);
