// Toggle sidebar visibility on small screens
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartCountDisplay = document.getElementById("cartCount");
  const cartLastDisplay = document.getElementById("cartLast");
  const cartTotalDisplay = document.getElementById("cartTotal");

  function updateCartInfo() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const lastItem = cart.length > 0 ? cart[cart.length - 1].name : "—";

    cartCountDisplay.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;
    cartLastDisplay.textContent = `Last item: ${lastItem}`;
    cartTotalDisplay.textContent = `Total: ₦${totalValue.toLocaleString()}`;
  }

  updateCartInfo();
});

