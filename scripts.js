const cardsArray = ["images/bobrossparrot.gif", "images/tripletsparrot.gif", "images/revertitparrot.gif", "images/metalparrot.gif", "images/fiestaparrot.gif", "images/explodyparrot.gif", "images/unicornparrot.gif"];
let check = 0;
let cardsQuant = 0;
let clickedCards = 0;
let movesNumber = 0;
let alreadyplayed = false;

function comparador() { 
	return Math.random() - 0.5; 
}

function cardsNumber() {
    const nCardsAux = prompt("Quantas cartas você deseja? (Números pares de 4 a 14)");
    const nCards = parseInt(nCardsAux);
    cardsQuant = nCards;

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

    if(alreadyplayed == false) {
        for(i=0; i<numCards; i++) {
            addCards.innerHTML += `
                <div class="card${i+1} card" data-identifier="card" onclick="transition(${i+1})">
                    <div class="face back-face" data-identifier="back-face"><img src="${randomizedCards[i]}"></div>
                    <div class="face front-face" data-identifier="front-face"><img src="images/front.png"></div>
                </div>
            `;
        }
    } else {
        movesNumber = 0;
        addCards.innerHTML = "";
        for(i=0; i<numCards; i++) {
            addCards.innerHTML += `
                <div class="card${i+1} card" data-identifier="card" onclick="transition(${i+1})">
                    <div class="face back-face" data-identifier="back-face"><img src="${randomizedCards[i]}"></div>
                    <div class="face front-face" data-identifier="front-face"><img src="images/front.png"></div>
                </div>
            `;
        }
    }
}

function transition(num) {
    const frontFace = document.querySelector(`.card${num} .front-face`);
    const backFace = document.querySelector(`.card${num} .back-face`);
    const frontFaceAux = document.querySelector(`.card${num} .front-face-transition`);
    const backFaceAux = document.querySelector(`.card${num} .back-face-transition`);
    let cardSelected = document.querySelector(".selected");

    if((frontFaceAux == null) && (backFaceAux == null) && (clickedCards < 2)) {
        frontFace.classList.add("front-face-transition");
        backFace.classList.add("back-face-transition");
        clickedCards++;
        movesNumber++;

        if(cardSelected !== null) {
            cardSelected = document.querySelector(".selected .back-face");
            if(cardSelected.innerHTML == backFace.innerHTML) {
                cardSelected = document.querySelector(".selected");
                cardSelected.classList.remove("selected");
                check++;
                unclickCards();
                if(check === (cardsQuant/2)) {
                    alreadyplayed = true;
                    check = 0;
                    setTimeout(winAlert, 500);
                }
            }
            else {
                setTimeout(unclickCards, 1000);
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

function winAlert() {
    let playAgain = '';
    playAgain = prompt(`Você ganhou em ${movesNumber} jogadas! Deseja jogar novamente? s/n`);

    if(playAgain == 's') {
        cardsNumber();
        playAgain = 'n';
    }
    if(playAgain !== 'n') {
        winAlert();
    }
}

function unclickCards() {
    clickedCards = clickedCards - 2;
}