document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("ordersList");

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>You haven't placed any orders yet.</p>";
    return;
  }

  orders.reverse().forEach(order => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>Order #${order.id}</h2>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
      <ul style="margin-top: 0.5rem;">
        ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join("")}
      </ul>
    `;
    ordersList.appendChild(card);
  });
});
