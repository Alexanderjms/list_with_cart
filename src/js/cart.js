let cartCount = 0;
const cartItems = {};

function renderCartItems(cartListEl, cartItems) {
  cartListEl.innerHTML = "";
  let total = 0;
  for (const title in cartItems) {
    const item = cartItems[title];
    const itemPrice = parseFloat(item.price.replace("$", ""));
    total += item.qty * itemPrice;
    const el = document.createElement("div");
    el.className = "text-left my-2";
    el.innerHTML = `<span class="font-semibold">${title}</span><br><span class="font-bold text-amber-700">${item.qty}x</span> <span class="text-gray-500 ml-3">${item.price}</span>`;
    cartListEl.appendChild(el);
  }
  return total;
}

export function initCart() {
  const counterEl = document.getElementById("cart-count");
  const cartListEl = document.getElementById("cart-list");
  const cartEmptyEl = document.getElementById("cart-empty");
  const totalEl = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");
  const orderModal = document.getElementById("order-modal");
  const modalOrderList = document.getElementById("modal-order-list");
  const modalTotal = document.getElementById("modal-total");
  const newOrderButton = document.getElementById("new-order-button");
  const closeModalButton = document.getElementById("close-modal-button");

  if (
    !counterEl ||
    !cartListEl ||
    !cartEmptyEl ||
    !totalEl ||
    !checkoutButton ||
    !orderModal ||
    !modalOrderList ||
    !modalTotal ||
    !newOrderButton ||
    !closeModalButton
  ) {
    console.error("Cart or modal elements not found.");
    return;
  }

  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      const price = btn.dataset.price;
      const image = btn.dataset.image;

      if (!title || !price || !image) {
        console.error("Product data missing.", btn);
        return;
      }

      if (cartCount === 0) {
        cartEmptyEl.style.display = "none";
      }

      cartCount++;
      counterEl.textContent = cartCount;

      if (cartItems[title]) {
        cartItems[title].qty++;
      } else {
        cartItems[title] = { qty: 1, price: price, image: image };
      }

      const total = renderCartItems(cartListEl, cartItems);
      totalEl.innerHTML = `<span class="font-bold">$${total.toFixed(2)}</span>`;
    });
  });

  checkoutButton.addEventListener("click", () => {
    if (cartCount === 0) return;

    modalOrderList.innerHTML = "";
    let total = 0;
    for (const title in cartItems) {
      const item = cartItems[title];
      const itemPrice = parseFloat(item.price.replace("$", ""));
      total += item.qty * itemPrice;
      const el = document.createElement("div");
      el.className = "flex justify-between items-center my-2";
      el.innerHTML = `
            <div class="flex items-center">
                <img src="${
                  item.image
                }" alt="${title}" class="w-12 h-12 rounded-md mr-4">
                <div>
                    <span class="font-semibold">${title}</span><br>
                    <span class="font-bold text-amber-700">${
                      item.qty
                    }x</span> <span class="text-gray-500 ml-2">@ ${
        item.price
      }</span>
                </div>
            </div>
            <span class="font-bold">$${(item.qty * itemPrice).toFixed(2)}</span>
        `;
      modalOrderList.appendChild(el);
    }

    // Update modal total
    modalTotal.textContent = `$${total.toFixed(2)}`;

    // Show modal
    orderModal.classList.remove("opacity-0", "invisible");
    orderModal.querySelector(".modal-box").classList.remove("scale-95");
  });

  function hideModal() {
    orderModal.classList.add("opacity-0");
    orderModal.querySelector(".modal-box").classList.add("scale-95");
    setTimeout(() => {
      orderModal.classList.add("invisible");
    }, 300);
  }

  newOrderButton.addEventListener("click", () => {
    hideModal();

    setTimeout(() => {
      cartCount = 0;
      for (const key in cartItems) {
        delete cartItems[key];
      }

      // Update UI
      counterEl.textContent = cartCount;
      cartListEl.innerHTML = "";
      totalEl.innerHTML = `<span class="font-bold">$0.00</span>`;
      cartEmptyEl.style.display = "block";
    }, 300);
  });

  closeModalButton.addEventListener("click", hideModal);
}
