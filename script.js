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
// Загрузка деталей заказа на странице order-details.html
document.addEventListener("DOMContentLoaded", function() {
  const detailContainer = document.getElementById("order-detail-container");
  if (!detailContainer) return; // Если мы не на order-details.html, выходим

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id");

  if (!orderId) {
    detailContainer.innerHTML = "<p>Заказ не найден.</p>";
    return;
  }

  fetch('orders.json')
    .then(response => response.json())
    .then(orders => {
      const order = orders.find(o => o.id === orderId);

      if (!order) {
        detailContainer.innerHTML = "<p>Заказ не найден.</p>";
        return;
      }

      detailContainer.innerHTML = `
        <div class="order-card">
          <div class="left">
            <div class="badge">${order.city}</div>
            <div class="number">№ ${order.id}</div>
            <div class="slogan">${order.object}</div>
            <div class="label">Стоимость работ:</div>
            <div class="value">${order.price} ₽</div>
            <div class="date-block">Размещено: ${order.created}</div>
          </div>
          <div class="right">
            <a href="${order.paymentLink}" class="cta-button">Купить контакт за ${order.contactPrice} ₽</a>
          </div>
        </div>

        <section class="info-block">
          <h2>Описание заказа</h2>
          <p>${order.description || "Описание не предоставлено."}</p>
        </section>

        <section class="info-block admin-comment">
          <h2>Комментарий от администрации</h2>
          <p>${order.adminComment || "Комментарий отсутствует."}</p>
        </section>
      `;
    })
    .catch(error => {
      console.error('Ошибка загрузки заказа:', error);
      detailContainer.innerHTML = "<p>Не удалось загрузить заказ.</p>";
    });
});
