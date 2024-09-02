const url = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyZThlZmNlOWJmYTAwMTU4MTkzNjEiLCJpYXQiOjE3MjUwOTgyMjMsImV4cCI6MTcyNjMwNzgyM30.y-7UcrCNKPLngUfGeMF7onwDoJak_keYbpUwSBKclaw";
const result = document.getElementById("sezione");
const fetchGet = async () => {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
        }
    });
    const risultato = await res.json();
    console.log(risultato);
    risultato.forEach(el => {
        creaCard(el, result);
    });
};

fetchGet();

  // Crea gli elementi HTML 

const creaCard = (dataCard, posizione) => {
    const cardWrap = document.createElement("div");
    const card = document.createElement("div");
    const imgCard = document.createElement("img");
    const cardBody = document.createElement("div");
    const titleCard = document.createElement("h5");
    const priceProduct = document.createElement("p");
    const descriptionCard = document.createElement("p");
    const divButton = document.createElement("div");
    const buttonChange = document.createElement("button");
    const buttonDelete = document.createElement("button");

    // Aggiungi classi CSS
    cardWrap.classList.add("col-lg-3", "col-md-4", "mb-4", "card-wrapper");
    card.classList.add("card");
    imgCard.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    titleCard.classList.add("card-title");
    priceProduct.classList.add("card-price");
    descriptionCard.classList.add("card-text");
    divButton.classList.add("button-group");

    // Imposta il contenuto
    titleCard.innerText = dataCard.name;
    priceProduct.innerText = ` £${dataCard.price}`;
    descriptionCard.innerText = dataCard.description;
    imgCard.src = dataCard.imageUrl;
    imgCard.alt = dataCard.name;

    buttonChange.innerText = "Change";
    buttonChange.classList.add("btn", "btn-primary");
    buttonDelete.innerText = "Delete";
    buttonDelete.classList.add("btn", "btn-danger");

    // Costruzione della card
    divButton.append(buttonChange, buttonDelete);
    cardBody.append(titleCard, priceProduct, descriptionCard, divButton);
    card.append(imgCard, cardBody);
    cardWrap.appendChild(card);
    posizione.appendChild(cardWrap);

    // Event listeners per i bottoni
    buttonDelete.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (dataCard._id) {
                    fetch(`${url}${dataCard._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${key}`
                        }
                    })
                    .then(res => {
                        if (res.ok) {
                            cardWrap.remove();
                        } else {
                            throw new Error("Errore nella risposta");
                        }
                    })
                    .catch(err => console.error("Error in delete:", err));
                } else {
                    console.error("ID is not defined, Sorry");
                }
            }
        });
    });

      
    buttonChange.addEventListener("click", () => {
        Swal.fire({
            title: "Update Product",
            text: "Do you want to update this product?",
            icon: "question",
            confirmButtonText: "Update",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `cheangeName.html?id=${dataCard._id}`;
            }
        });
    });
};