document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("orders-container");

  fetch("orders.json")
    .then((res) => res.json())
    .then((orders) => {
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

      // Поиск по ключевым словам
      document.querySelector(".search-input").addEventListener("input", function () {
        const value = this.value.trim().toLowerCase();

        const cards = document.querySelectorAll(".order-card");
        cards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          if (text.includes(value)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    })
    .catch((err) => {
      container.innerHTML = "<p>Не удалось загрузить заказы.</p>";
      console.error("Ошибка загрузки orders.json:", err);
    });
});