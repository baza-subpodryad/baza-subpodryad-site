
// script.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orders-container");
  const searchInput = document.querySelector(".search-input");
  let allOrders = [];

  function renderCards(orders) {
    container.innerHTML = "";
    orders.forEach((order) => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <div class="left">
          <div class="badge">ГЕНПОДРЯД</div>
          <div class="slogan">Прямые контакты без посредников</div>
          <a class="number" href="order-${order.id}.html">№ ${order.id}</a>
          <div class="badge-region">📍 ${order.region}</div>
          <div class="status">Приём заявок открыт</div>
          <div><div class="label">Объект</div><div class="value">${order.object}</div></div>
          <div><div class="label">Заказчик</div><div class="value">${order.customer}</div></div>
        </div>
        <div class="right">
          <a class="price-badge" href="#">${order.price.toLocaleString("ru-RU")} ₽</a>
          <div class="date-block">
            <div>Размещено: <strong>${order.datePosted}</strong></div>
            <div>Обновлено: <strong>${order.dateUpdated}</strong></div>
            <div>Окончание подачи заявок: <strong>${order.dateEnd}</strong></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function filterOrders(query) {
    const lowerQuery = query.toLowerCase();
    return allOrders.filter((order) => {
      return (
        order.id.toLowerCase().includes(lowerQuery) ||
        order.region.toLowerCase().includes(lowerQuery) ||
        order.object.toLowerCase().includes(lowerQuery) ||
        order.customer.toLowerCase().includes(lowerQuery)
      );
    });
  }

  fetch("orders.json")
    .then((res) => res.json())
    .then((data) => {
      allOrders = data;
      renderCards(allOrders);
    })
    .catch((err) => {
      container.innerHTML = "<p>Не удалось загрузить заказы.</p>";
      console.error("Ошибка загрузки orders.json:", err);
    });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (value.length >= 2) {
        const filtered = filterOrders(value);
        renderCards(filtered);
      } else {
        renderCards(allOrders);
      }
    });
  }
});
