document.addEventListener("DOMContentLoaded", () => {
  console.log("Script carregado na página /orçamento");
  const quoteItemsContainer = document.getElementById("quote-items-container");
  if (!quoteItemsContainer) {
    console.error("Contêiner quote-items-container não encontrado");
    return;
  }
  const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");
  console.log("Itens do LocalStorage:", quoteItems);

  if (Object.keys(quoteItems).length === 0) {
    quoteItemsContainer.innerHTML = "<p>No items in the cart.</p>";
    return;
  }

  Object.keys(quoteItems).forEach((key) => {
    const item = quoteItems[key];
    console.log("Adicionando item:", item);
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    const cartItem = `
            <div class="cart-item-image-wrapper">
              <img 
                src="${item.image}" 
                loading="lazy" 
                sizes="(max-width: 991px) 
                100vw, 60px" 
                srcset="${item.image} 500w, ${item.image} 540w" 
                alt="" 
                class="cart-item-image"
              >
            </div>
            <div class="cart-item-information">
              <div class="cart-item-information-heading">${item.name}</div>
              <div class="cart-item-information-subheading">${item.description}</div>
              <a href="#" class="cart-item-information-remove-link" data-slug="${item.slug}">Remove</a>
            </div>
            <div class="w-embed">
              <input 
                type="number" 
                class="w-commerce-commercecartquantity input cart-quantity" 
                min="1" 
                max="100000000"
                required 
                oninput="validity.valid||(value='');"
                name="quantity" 
                autocomplete="off" 
                value="${item.quantity}"
                data-slug="${item.slug}"
              >
            </div>
          `;
    itemDiv.innerHTML = cartItem;
    quoteItemsContainer.appendChild(itemDiv);
  });

  // Add event listeners for remove links and quantity inputs
  addClickEventListenersToRemoveLinks();
  addClickEventListenersToCartItemQuantityInputs();
});
