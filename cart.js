document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalDisplay = document.getElementById("cartTotal");
  const placeOrderBtn = document.getElementById("placeOrder");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalDisplay.textContent = "";
      return;
    }

    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "card";
      itemEl.innerHTML = `
        <h2>${item.name}</h2>
        <p>₦${item.price.toLocaleString()} x ${item.quantity}</p>
        <p><strong>Total:</strong> ₦${(item.price * item.quantity).toLocaleString()}</p>
      `;
      cartItemsContainer.appendChild(itemEl);
      total += item.price * item.quantity;
    });

    cartTotalDisplay.textContent = `Grand Total: ₦${total.toLocaleString()}`;
  }

  placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // ✅ Save the current cart as a new order
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString()
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // ✅ Clear cart
    localStorage.removeItem("cart");
    cart = [];
    renderCart();

    alert("Order placed successfully!");
  });

  renderCart();
});
