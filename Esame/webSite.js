//IMPORTANTE: Se la pagina non mostra le card o il carrello ha un problema, per favore ricarica la pagina.

const key =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyZThlZmNlOWJmYTAwMTU4MTkzNjEiLCJpYXQiOjE3MjUwOTgyMjMsImV4cCI6MTcyNjMwNzgyM30.y-7UcrCNKPLngUfGeMF7onwDoJak_keYbpUwSBKclaw";
const url = "https://striveschool-api.herokuapp.com/api/product/";

const input = document.getElementById("allProducts");
const prodotti = document.getElementById("prodotti");
let globalCounter = 0; // Contatore globale per il numero totale di prodotti nel carrello
const counterId = document.getElementById("counter");
counterId.textContent = `${globalCounter}`;
let allCounters = {}; // Oggetto per tenere traccia delle quantità di ogni prodotto nel carrello
let memoryStar = JSON.parse(localStorage.getItem("memoryStar")) || {};

// Funzione per salvare i prodotti preferiti nel localStorage
const localStorageFunction = () => {
  localStorage.setItem("memoryStar", JSON.stringify(memoryStar));
};

// Funzione per ottenere i prodotti dall'API
const fetchGet = async () => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  const risultato = await res.json();
  // Per ogni prodotto ottenuto, crea una card e la aggiunge al DOM
  risultato.forEach((el) => cardProduct(el, prodotti));
};

fetchGet();

// Funzione per aggiornare il riepilogo del carrello
const updateCartSummary = () => {
  const cartItemCount = document.getElementById("cartItemCount");
  const cartTotalPrice = document.getElementById("cartTotalPrice");

  // Calcola il numero totale di prodotti nel carrello
  const totalItems = Object.values(allCounters).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  // Calcola il prezzo totale del carrello
  const totalPrice = Object.entries(allCounters).reduce(
    (acc, [id, quantity]) => {
      const productElement = document.querySelector(`[data-id="${id}"]`);
      if (productElement) {
        const productPrice = parseFloat(
          productElement.querySelector(".card-text").textContent.slice(1)
        );
        const productTotal = productPrice * quantity;

        return acc + productTotal;
      }
      return acc;
    },
    0
  );

  // Aggiorna l'HTML con i nuovi valori
  cartItemCount.textContent = totalItems;
  cartTotalPrice.textContent = `${totalPrice.toFixed(2)}`;
};

const updateFavoriteProducts = () => {
  const favoriteProductsContainer = document.getElementById("cardmodel");
  favoriteProductsContainer.innerHTML = ""; // Svuota il contenitore dei prodotti preferiti
  // Per ogni prodotto preferito, crea una card e la aggiunge al DOM
  Object.entries(memoryStar).forEach(([id, { isFavorite, product }]) => {
    // Crea una nuova card per i preferiti
    const favCard = document.createElement("div");
    favCard.setAttribute(
      "class",
      "card m-2 d-flex justify-content-between favorite"
    );
    favCard.setAttribute("data-id", id);

    const favCardTitle = document.createElement("h4");
    favCardTitle.textContent = product.name;

    const favCardImg = document.createElement("img");
    favCardImg.setAttribute("class", "card-img w-100  h-100");
    favCardImg.src = product.imageUrl;

    const favCardPrice = document.createElement("h5");
    favCardPrice.textContent = ` £${product.price}`;

    favCard.appendChild(favCardTitle);
    favCard.appendChild(favCardPrice);
    favCard.appendChild(favCardImg);

    favoriteProductsContainer.appendChild(favCard);
  });
};
// Funzione per creare una card prodotto e aggiungerla al DOM
const cardProduct = (cardData, divToAppend) => {
  let localCounter = allCounters[cardData._id] || 0; //cardData.id
  let addedToCart = cartHasProduct(cardData._id);
  let starChecked = memoryStar[cardData._id]?.isFavorite || false;

  // Creazione della card del prodotto
  const card = document.createElement("div");
  card.setAttribute("class", "card  m-1  col col-md-4 col-lg-4 col-sm-12  ");
  card.setAttribute("data-id", cardData._id);

  const cardImg = document.createElement("img");
  cardImg.setAttribute("class", "card-img w-100 h-50");
  cardImg.src = cardData.imageUrl;

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body shadow-sm");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = cardData.name;
  cardTitle.setAttribute("class", "mt-2  text-dark");
  const cardBrand = document.createElement("h2");
  cardBrand.textContent = cardData.brand;
  cardTitle.setAttribute("class", "mt-2");

  const cardDescription = document.createElement("p");
  cardDescription.textContent = cardData.description;

  const containerButton = document.createElement("div");
  containerButton.setAttribute("class", "d-flex justify-content-between");

  const cardButton = document.createElement("button");
  cardButton.setAttribute(
    "class",
    addedToCart
      ? "add-to-cart btn btn-secondary"
      : "add-to-cart btn btn-primary"
  );
  cardButton.innerText = addedToCart ? "Added to Cart" : "Add to Cart";

  const cardDetails = document.createElement("button");
  cardDetails.classList.add("btn", "btn-secondary");
  cardDetails.innerText = "Details";

  const cardPrice = document.createElement("p");
  cardPrice.textContent = `£${cardData.price}`;
  cardPrice.setAttribute("class", "card-text");

  const spanWrapper = document.createElement("div");
  spanWrapper.setAttribute("class", "d-flex justify-content-center gap-3");

  const divSpanCounter = document.createElement("div");
  divSpanCounter.setAttribute("class", "text-dark");

  const spanCounter = document.createElement("span");
  spanCounter.textContent = `${localCounter}`;

  const minusCardButton = document.createElement("button");
  minusCardButton.setAttribute("class", "btn btn-secondary");
  minusCardButton.textContent = "-";

  const plusCardButton = document.createElement("button");
  plusCardButton.setAttribute("class", "btn btn-secondary");
  plusCardButton.textContent = "+";

  const divCardStar = document.createElement("div");
  divCardStar.setAttribute("class", "d-flex justify-content-end");
  const cardStar = document.createElement("ion-icon");
  cardStar.setAttribute("name", starChecked ? "star" : "star-outline");

  // Appende gli elementi alla card

  divCardStar.appendChild(cardStar);
  divSpanCounter.append(spanCounter);
  spanWrapper.append(minusCardButton, divSpanCounter, plusCardButton);
  containerButton.append(spanWrapper, cardButton);
  cardBody.append(cardDescription, cardBrand, cardPrice, containerButton);
  card.append(cardTitle, divCardStar, cardImg, cardBody, cardDetails);
  divToAppend.appendChild(card);

  // Gestisce il click sul pulsante "Details" per reindirizzare alla pagina dei dettagli del prodotto
  cardDetails.addEventListener("click", () => {
    window.location.href = `detailsClient.html?id=${cardData._id}`;
  });

  // Funzione per aggiornare il testo e la classe del pulsante "Add to Cart"
  const updateButtonText = () => {
    cardButton.innerText = addedToCart ? "Added to Cart" : "Add to Cart";
    cardButton.classList.toggle("btn-primary", !addedToCart);
    cardButton.classList.toggle("btn-secondary", addedToCart);
  };

  // Gestisce il click sul pulsante "Add to Cart"

  cardButton.addEventListener("click", () => {
    addedToCart = cartHasProduct(cardData._id);
    if (localCounter > 0) {
      addedToCart = !addedToCart;
      updateButtonText();

      if (addedToCart) {
        globalCounter += localCounter;
        allCounters[cardData._id] = localCounter;

        const cartItems = document.getElementById("cartItems");
        const cartCard = document.createElement("div");
        cartCard.setAttribute("class", "cart-item m-2");
        cartCard.setAttribute("data-id", cardData._id);

        const cartCardTitle = document.createElement("h4");
        cartCardTitle.textContent = cardData.title;

        const cartCardImg = document.createElement("img");
        cartCardImg.setAttribute("class", "cart-img w-50 h-50");
        cartCardImg.src = cardData.imageUrl;
        const cartCardPrice = document.createElement("p");
        cartCardPrice.setAttribute("class", "text-white");
        cartCardPrice.textContent =
          `${cardData.name}` +
          " : " +
          `£${cardData.price}` +
          " (Qty : " +
          allCounters[cardData._id] +
          ")";

        const removeButtonDiv = document.createElement("div");
        removeButtonDiv.setAttribute("class", "d-flex justify-content-between");
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "btn btn-danger");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", () => {
          removeFromCart(cardData._id);
        });
        removeButtonDiv.appendChild(removeButton);
        cartCard.append(
          cartCardTitle,
          cartCardImg,
          cartCardPrice,
          removeButtonDiv
        );
        cartItems.appendChild(cartCard);
      } else {
        globalCounter -= localCounter;
        delete allCounters[cardData._id];

        const cartItems = document.getElementById("cartItems");
        const cartCard = Array.from(cartItems.children).find(
          (child) => child.querySelector("h4").textContent === cardData.title
        );
        if (cartCard) {
          cartItems.removeChild(cartCard);
        }
      }

      counterId.textContent = `${globalCounter}`;
      updateCartSummary();
    }
  });
  // Gestisce il click sul pulsante "-" per decrementare la quantità del prodotto
  minusCardButton.addEventListener("click", () => {
    addedToCart = cartHasProduct(cardData._id);
    if (localCounter > 0) {
      localCounter--;
      spanCounter.textContent = `${localCounter}`;

      if (addedToCart) {
        globalCounter--;
        allCounters[cardData._id] = localCounter;
        counterId.textContent = `${globalCounter}`;
      }

      if (localCounter === 0 && addedToCart) {
        addedToCart = false;
        delete allCounters[cardData._id];
        updateButtonText();
        removeFromCart(cardData._id);
      }
      updateCartSummary();
    }
  });
  // Gestisce il click sul pulsante "+" per incrementare la quantità del prodotto
  plusCardButton.addEventListener("click", () => {
    addedToCart = cartHasProduct(cardData._id);
    // Recupera la quantità del prodotto dal carrello, quindi incrementa
    // per evitare di usare i valori memorizzati localmente nella variabile localCounter
    localCounter = allCounters[cardData._id] || 0;
    localCounter++;
    spanCounter.textContent = `${localCounter}`;
    allCounters[cardData._id] = localCounter;
    if (addedToCart) {
      globalCounter++;
      counterId.textContent = `${globalCounter}`;
      updateCartSummary();
    }
  });
  // Gestisce il click sull'icona della stella
  cardStar.addEventListener("click", () => {
    starChecked = !starChecked;
    if (starChecked) {
      memoryStar[cardData._id] = {
        isFavorite: starChecked,
        product: cardData,
      };

      console.log("cardStar.addEventListener", memoryStar);
    } else {
      delete memoryStar[cardData._id];
    }

    cardStar.setAttribute("name", starChecked ? "star" : "star-outline");
    localStorageFunction();
    // Assicurati che la funzione favoriteProduct sia definita se necessaria

    updateFavoriteProducts();
  });
};

// Funzione per verificare se un prodotto è già nel carrello
const cartHasProduct = (productId) => {
  const cartItems = document.getElementById("cartItems");
  const cartItem = cartItems.querySelector(`[data-id="${productId}"]`);

  if (cartItem) {
    return true;
  }
  return false;
};

const removeFromCart = (productId) => {
  const cartItems = document.getElementById("cartItems");
  const cartItem = cartItems.querySelector(`[data-id="${productId}"]`);

  if (cartItem) {
    // Ottieni la quantità attuale del prodotto
    const quantityToRemove = allCounters[productId] || 0;

    // Sottrai dal contatore globale la quantità del prodotto da rimuovere
    globalCounter -= quantityToRemove;

    // Azzera il contatore locale e rimuovi il prodotto da allCounters

    delete allCounters[productId];

    // Aggiorna lo span del contatore nella card del prodotto
    const productElement = document.querySelector(`[data-id="${productId}"]`);
    if (productElement) {
      const spanCounter = productElement.querySelector("span");
      spanCounter.textContent = "0";

      // aggiorna la classe e il testo del pulsante "Aggiungi al carrello" della card (ripristina allo stato iniziale)
      const addToCartButton =
        productElement.querySelector("button.add-to-cart");
      addToCartButton.setAttribute("class", "add-to-cart btn btn-primary");
      addToCartButton.innerText = "Add to Cart";
    }

    // Rimuovi il prodotto dal DOM del carrello
    cartItems.removeChild(cartItem);

    // Aggiorna il contatore globale nella UI
    counterId.textContent = `${globalCounter}`;

    // Aggiorna il riepilogo del carrello (totale prodotti e prezzo)
    updateCartSummary();
  }
};

//togiere tutti i consolelog

updateFavoriteProducts();
