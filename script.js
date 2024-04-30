let cardOne, cardTwo;
let diplayFalse = false;
let matches = 0;
let moves = 0;
const cards = document.querySelectorAll(".card");
const scorePannal = document.querySelector(".score");
const movesPanal = document.querySelector(".moves");
const restartBtn = document.querySelector(".restart-button");

function flipCard(e) {
  let clickCard = e.target;

  if (clickCard !== cardOne && !diplayFalse) {
    clickCard.classList.add("flip");
    moves++;
    movesPanal.innerHTML = `Moves : ${moves}`;
    if (!cardOne) {
      return (cardOne = clickCard);
    }
    diplayFalse = true;
    cardTwo = clickCard;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matches++;
    if (matches === 8) {
      return setTimeout(() => {
        startOver();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; //empty the cardOne and cardTwo
    scorePannal.innerHTML = `Score : ${matches} / 8`;
    return (diplayFalse = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("flip", "shake");
    cardTwo.classList.remove("flip", "shake");
    cardOne = cardTwo = ""; //empty the cardOne and cardTwo
    diplayFalse = false;
  }, 1200);
}

function startOver() {
  cardOne = cardTwo = ""; //empty the cardOne and cardTwo
  diplayFalse = false;
  matches = 0;
  moves = 0;
  scorePannal.innerHTML = `Score : ${matches} / 8`;
  movesPanal.innerHTML = `Moves : ${moves}`;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    let img = card.querySelector("img");
    img.src = `img/img-${arr[index]}.png`;
  });
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

restartBtn.addEventListener("click", startOver);
