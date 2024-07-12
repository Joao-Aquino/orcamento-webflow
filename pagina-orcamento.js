document.addEventListener("DOMContentLoaded", () => {
  const quoteItemsContainer = document.getElementById("quote-items-container");
  const quoteItems = JSON.parse(localStorage.getItem("quoteItems") || "{}");

  if (Object.keys(quoteItems).length === 0) {
    quoteItemsContainer.innerHTML = "<p>No items in the cart.</p>";
    return;
  }

  Object.keys(quoteItems).forEach((key) => {
    const item = quoteItems[key];
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("quote-item");
    itemDiv.innerHTML = `
            <div class="cart-item-image-wrapper">
              <img 
                src="${quoteItems[key]["image"]}" 
                loading="lazy" 
                sizes="(max-width: 991px) 
                100vw, 60px" 
                srcset="${quoteItems[key]["image"]} 500w, ${quoteItems[key]["image"]} 540w" 
                alt="" 
                class="cart-item-image"
              >
            </div>
            <div class="cart-item-information">
              <div class="cart-item-information-heading">${quoteItems[key]["name"]}</div>
              <div class="cart-item-information-subheading">${quoteItems[key]["description"]}</div>
              ${removeLink.outerHTML}
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
                value="${quoteItems[key]["quantity"]}"
                data-slug="${quoteItems[key]["slug"]}"
              >
            </div>
        `;
    quoteItemsContainer.appendChild(itemDiv);
  });
});
