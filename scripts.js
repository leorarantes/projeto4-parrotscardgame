const cardsArray = ["images/bobrossparrot.gif", "images/tripletsparrot.gif", "images/revertitparrot.gif", "images/metalparrot.gif", "images/fiestaparrot.gif", "images/explodyparrot.gif", "images/unicornparrot.gif"];
let check = 0;

function comparador() { 
	return Math.random() - 0.5; 
}

function cardsNumber() {
    const nCardsAux = prompt("Quantas cartas você deseja? (Números pares de 4 a 14)");
    const nCards = parseInt(nCardsAux);

    if((nCards > 14) || (nCards < 4) || (nCards%2 != 0)) {
        cardsNumber();
    }
    else {
        renderizeCards(nCards);
    }
}

function renderizeCards(numCards) {
    let randomizedCards = [];
    const addCards = document.querySelector(".main-box-aux");

    for(let i=0; i<(numCards/2); i++) {
        randomizedCards.push(cardsArray[i]);
        randomizedCards.push(cardsArray[i]);
    }

    randomizedCards.sort(comparador);

    for(i=0; i<numCards; i++) {
        addCards.innerHTML += `
            <div class="card${i+1} card" data-identifier="card" onclick="transition(${i+1})">
                <div class="face back-face" data-identifier="back-face"><img src="${randomizedCards[i]}"></div>
                <div class="face front-face" data-identifier="front-face"><img src="images/front.png"></div>
            </div>
        `;
    }
}

function transition(num) {
    const frontFace = document.querySelector(`.card${num} .front-face`);
    const backFace = document.querySelector(`.card${num} .back-face`);
    const frontFaceAux = document.querySelector(`.card${num} .front-face-transition`);
    const backFaceAux = document.querySelector(`.card${num} .back-face-transition`);
    let cardSelected = document.querySelector(".selected");

    if((frontFaceAux == null) && (backFaceAux == null)) {
        frontFace.classList.add("front-face-transition");
        backFace.classList.add("back-face-transition");

        if(cardSelected !== null) {
            cardSelected = document.querySelector(".selected .back-face");
            if(cardSelected.innerHTML == backFace.innerHTML) {
                cardSelected = document.querySelector(".selected");
                cardSelected.classList.remove("selected");
                check++;
            }
            else {
                setTimeout(removeSelected, 1000);
                cardSelected = document.querySelector(`.card${num}`);
                cardSelected.classList.add("selected");
                setTimeout(removeSelected, 1000);
            }            
        } else {
            cardSelected = document.querySelector(`.card${num}`); 
            cardSelected.classList.add("selected");
        }
    }
}

function removeSelected() {
    let selected = document.querySelector(".selected");
    if(selected !== null) {
        selected = document.querySelector(".selected .front-face");
        selected.classList.remove("front-face-transition");
    
        selected = document.querySelector(".selected .back-face");
        selected.classList.remove("back-face-transition");
    
        selected = document.querySelector(".selected");
        selected.classList.remove("selected");
    }
}