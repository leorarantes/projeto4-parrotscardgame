const cardsArray = ["images/bobrossparrot.gif", "images/tripletsparrot.gif", "images/revertitparrot.gif", "images/metalparrot.gif", "images/fiestaparrot.gif", "images/explodyparrot.gif", "images/unicornparrot.gif"];
let clickedCards = 0;

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

    if((frontFaceAux == null) && (backFaceAux == null) && (clickedCards < 2)) {
        frontFace.classList.add("front-face-transition");
        backFace.classList.add("back-face-transition");
        clickedCards++;
    }
    
    if((frontFaceAux !== null) || (backFaceAux !== null)) {
        frontFace.classList.remove("front-face-transition");
        backFace.classList.remove("back-face-transition");
        clickedCards--;
    }
}