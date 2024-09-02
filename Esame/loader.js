export function loadingStart(){
    const cardLoader = document.createElement("div");

    
    cardLoader.id = "loader";

 
    cardLoader.className = "spinner";

    const cardP = document.createElement("p");
    cardP.innerHTML = "loading ... ";

    cardLoader.append(cardP);

    
    document.body.appendChild(cardLoader);
}

export function loadingStop() {
   
   document.getElementById("loader").remove();
   
}