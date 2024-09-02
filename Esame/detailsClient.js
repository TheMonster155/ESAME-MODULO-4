
const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyZThlZmNlOWJmYTAwMTU4MTkzNjEiLCJpYXQiOjE3MjUwOTgyMjMsImV4cCI6MTcyNjMwNzgyM30.y-7UcrCNKPLngUfGeMF7onwDoJak_keYbpUwSBKclaw";
const url = new URLSearchParams(window.location.search);
const id = url.get('id');

const detailsDiv = document.getElementById("details");

const fillCard = async () => {
    try {
        const response = await fetch(endPoint + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const dati = await response.json();

        // Creazione della card 
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const img = document.createElement("img");
        img.setAttribute("src", dati.imageUrl);
        img.setAttribute("alt", dati.name);

        const name = document.createElement("h2");
        name.textContent = dati.name;

        const description = document.createElement("p");
        description.textContent = dati.description;

        const brand = document.createElement("p");
        brand.innerHTML = `<strong>Brand:</strong> ${dati.brand}`;

        const price = document.createElement("p");
        price.innerHTML = `<strong>Price:</strong> £${dati.price}`;

        const button = document.createElement("button");
        button.setAttribute("class", "btn btn-secondary");
        button.innerText = "Confirmed";

        // Append elementi alla card
        card.append(img, name, description, brand, price, button);
        detailsDiv.appendChild(card);

        button.addEventListener("click", () => {
            Swal.fire({
                title: "Thanks for visualized",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/images/trees.png)",
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                `}).then(() => {
                window.location.href = "./webSite.html";
            });
        });

    } catch (error) {
        Swal.fire({
            title: "Problem Date",
            text: "Sorry, error date",
            icon: "error"
        });
    }
};

fillCard();