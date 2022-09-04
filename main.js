const cardsData = [
    {
        name: "poke1",
        img: "cards/kép1.JPG"
    },
    {
        name: "poke1",
        img: "cards/kép1.JPG"
    },
    {
        name: "poke2",
        img: "cards/kép2.JPG"
    },
    {
        name: "poke2",
        img: "cards/kép2.JPG"
    },
    {
        name: "poke3",
        img: "cards/kép3.JPG"
    },
    {
        name: "poke3",
        img: "cards/kép3.JPG"
    },
    {
        name: "poke4",
        img: "cards/kép4.JPG"
    },
    {
        name: "poke4",
        img: "cards/kép4.JPG"
    },
    {
        name: "poke5",
        img: "cards/kép5.JPG"
    },
    {
        name: "poke5",
        img: "cards/kép5.JPG"
    }
];
cardsData.sort(() => 0.5 - Math.random());

const timer = document.querySelector(".timer");

let cards = [];
let chosenCards = [];
let foundPairs = [];

let firstClick = true;
let elapsedTime = 0;

const unflipCards = () => {
    cards.forEach((card, idx) => {
        if (foundPairs.includes(idx) === false) {
            card.classList.remove('flipped');
        }
    });
}

const checkMatch = () => {
    let dataId1 = parseInt(chosenCards[0].getAttribute('data-id'));
    let dataId2 = parseInt(chosenCards[1].getAttribute('data-id'));

    if (cardsData[dataId1].name === cardsData[dataId2].name) {
        foundPairs.push(dataId1);
        foundPairs.push(dataId2);
    }

    if (foundPairs.length === cardsData.length) {
        firstClick = true;
        setTimeout(resetGame, 5000);
    } else {
        chosenCards = [];
        unflipCards();
    }
}

const clickCard = (card) => {
    if (firstClick) {
        firstClick = false;
    }
    if (!chosenCards.includes(card) && !foundPairs.includes(card)) {
        card.classList.toggle('flipped');
        chosenCards.push(card);
        if (chosenCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

const addEventListenersToCards = () => {
    cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => clickCard(card));
    })
}

const createCards = () => {
    const boardContainer = document.querySelector(".boardContainer");
    boardContainer.innerHTML = "";

    for (let i = 0; i < cardsData.length; i++) {
        let templateCard = `
        <div class="card" data-id="${i}">    
            <div class="cardFace">
                <img src="${cardsData[i].img}" width="100%" height="100%" alt="">
            </div>
            <div class="cardBack">
                <img src="${'./cards/background2.JPG'}" width="100%" height="100%" alt="">
            </div>
        </div>`
        boardContainer.innerHTML += (templateCard);
    };
}

const init = () => {
    createCards();
    addEventListenersToCards();
};

const resetGame = () => {
    firstClick = true;
    elapsedTime = 0;
    chosenCards = [];
    foundPairs = [];

    timer.innerHTML = "00:00";

    cardsData.sort(() => 0.5 - Math.random());
    init();
}

setInterval(() => {
    if (!firstClick) {
        elapsedTime += 1;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime - 60 * minutes;
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (elapsedTime >= 300) {
            resetGame();
        }
    }
}, 1000);

init();
