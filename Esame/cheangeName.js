

const endPoint = "https://striveschool-api.herokuapp.com/api/product/";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyZThlZmNlOWJmYTAwMTU4MTkzNjEiLCJpYXQiOjE3MjUwOTgyMjMsImV4cCI6MTcyNjMwNzgyM30.y-7UcrCNKPLngUfGeMF7onwDoJak_keYbpUwSBKclaw";
const url = new URLSearchParams(location.search);
const id = url.get('id');

const editButton = document.getElementById("button");

const fillForm = async () => {
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
        // Popola i campi della form con i dati del prodotto
        document.getElementById("name").value = dati.name;
        document.getElementById("description").value = dati.description;
        document.getElementById("brand").value = dati.brand;
        document.getElementById("price").value = dati.price;
        document.getElementById("imageUrl").value = dati.imageUrl;

    } catch (error) {
        console.error('Fetch error:', error);
       
    }
};

const updateData = async (e) => {
    e.preventDefault();
// Recupera i valori inseriti dall'utente nei campi della form
    const inputNameProduct = document.getElementById("name").value;
    const inputDescriptionProduct = document.getElementById("description").value;
    const inputBrandProduct = document.getElementById("brand").value;
    const inputImgProduct = document.getElementById("imageUrl").value;
    let inputPriceProduct = document.getElementById("price").value;
    const priceValue = Number(inputPriceProduct);
    const button = document.getElementById("button")

    // Verifica che tutti i campi siano compilati correttamente
    if (!inputNameProduct || !inputDescriptionProduct || !inputBrandProduct || !inputImgProduct || isNaN(priceValue) || priceValue < 0) {
        alert("Compila tutti i campi correttamente.");
        return;
    }

    // Crea un oggetto con i dati aggiornati del prodotto
    const marketProduct = {
        name: inputNameProduct,
        description: inputDescriptionProduct,
        brand: inputBrandProduct,
        imageUrl: inputImgProduct,
        price: priceValue
    };

    try {
        const response = await fetch(endPoint + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            },
            body: JSON.stringify(marketProduct)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        console.log(result);

     
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "/BackEnd.html";
            });
        
           
        
     
      
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Errore durante l\'aggiornamento del prodotto.');
    }
 
};


fillForm();


editButton.addEventListener('click', updateData);