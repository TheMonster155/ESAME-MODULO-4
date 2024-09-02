import { loadingStart, loadingStop } from './loader.js';

const buttonCreaCard = document.getElementById("button")
const url = "https://striveschool-api.herokuapp.com/api/product/"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyZThlZmNlOWJmYTAwMTU4MTkzNjEiLCJpYXQiOjE3MjUwOTgyMjMsImV4cCI6MTcyNjMwNzgyM30.y-7UcrCNKPLngUfGeMF7onwDoJak_keYbpUwSBKclaw"

buttonCreaCard.addEventListener("click", e => {
  e.preventDefault();
  const nameCard = document.getElementById("name").value;
  const descriptionCard = document.getElementById("description").value;
  const brandCard = document.getElementById("brand").value;
  let priceCard = document.getElementById("price").value;
  const imgCard = document.getElementById("imageUrl").value;
  const valueCard = Number(priceCard);

  const products = {
      name: nameCard,
      description: descriptionCard,
      brand: brandCard,
      imageUrl: imgCard,
      price: valueCard
  };

  loadingStart(); 

  
  setTimeout(() => {
      fetch("https://striveschool-api.herokuapp.com/api/product/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${key}`
          },
          body: JSON.stringify(products)
      })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          loadingStop(); 
          Swal.fire({
              title: "Product created!",
              text: "The product was successfully created!",
              icon: "success"
          }).then(() => {
              window.location.href = "./BackEnd.html";
          });
      })
      .catch(error => {
          loadingStop(); 
          console.error("Errore:", error);
          Swal.fire({
              title: "Error",
              text: "Sorry, something went wrong.",
              icon: "error"
          });
      });
  }, 5000); 
});