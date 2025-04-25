document.addEventListener("DOMContentLoaded", () => {
  fetch("orders.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("orders-container");
      container.innerHTML = "";

      data.forEach(order => {
        const card = document.createElement("article");
        card.className = "order-card";

        card.innerHTML = `
          <div class="left">
            <span class="badge">ГЕНПОДРЯД</span>
            <p><em>Прямые контакты без посредников</em></p>
            <p><strong>№ ${order.id}</strong> <span class="badge-region">📍 ${order.city || ""}</span></p>
            <p style="color: green; font-weight: bold;">${order.status || ""}</p>
            <p><span class="label">Объект</span><br>${order.title || "undefined"}</p>
            <p><span class="label">Заказчик</span><br>${order.client || "undefined"}</p>
          </div>
          <div class="right">
            <p class="price-badge">${order.price || ""}</p>
            <div class="date-block">
              Размещено: <strong>${order.datePublished || "undefined"}</strong><br>
              Обновлено: <strong>${order.dateUpdated || "undefined"}</strong><br>
              Окончание подачи заявок: <strong>${order.dateEnd || "undefined"}</strong>
            </div>
          </div>
        `;

        if (order.link) {
          card.style.cursor = "pointer";
          card.addEventListener("click", () => {
            window.location.href = order.link;
          });
        }

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Ошибка загрузки заказов:", error);
    });
});
