const cardsArray = ["images/bobrossparrot.gif", "images/tripletsparrot.gif", "images/revertitparrot.gif", "images/metalparrot.gif", "images/fiestaparrot.gif", "images/explodyparrot.gif", "images/unicornparrot.gif"];

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
            <div class="card" data-identifier="card">
                <img src="images/front.png">
            </div>
        `;
    }
}