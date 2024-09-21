const cards = document.querySelectorAll(".card");
let btn = document.querySelector(".btn");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let isFliped = false;
let count = 0;
let time = 30;

function filpCard(e) {
    var clickedCard = e.target; // getting user clicked card
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            //return the cardOne value to clickedCard
            flipCount();
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        flipCount();
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCard(cardOneImg, cardTwoImg);

    }
}


function matchCard(img1, img2) {
    if (img1 === img2) { //if two card img matched
        matchedCard++; //increment matched value by 1
        //if matched value is 8 that means user has matched all the cards (8 * 2 = 16)
        if (matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000)
        }
        cardOne.removeEventListener("click", filpCard);
        cardTwo.removeEventListener("click", filpCard);
        cardOne = cardTwo = ""; //seting both card value to blank
        return disableDeck = false;
    }

    setTimeout(() => {
        //adding shake class to both card after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        //removing both shake & flip classes from the both card after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //seting both card value to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    //creating array of 16 iitems and each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//sorting array item randomly

    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[i]}.png`
        card.addEventListener("click", filpCard);
    })
}

shuffleCard();

let isCountingDown = false;

cards.forEach(card => { // adding click event to all cards
    card.addEventListener("click", filpCard);

    card.addEventListener("click", ()=>{
        if(!isCountingDown){
            countDown();//Start countdown if not already started
        }
    });
})


function countDown(){
    if(isCountingDown) return;

    isCountingDown = true;

    let countDownTime = document.querySelector(".countdown")
    const internalValid = setInterval(()=>{
        if(time <= 0){
            clearInterval(internalValid);
            countDownTime.innerHTML = `<label class="countdown">Time: 0s</label>`;
        }else{
            countDownTime.innerHTML = `<label class="countdown">Time: ${time}s</label>`;
            time--;
        }
        if(time == 0){
            disableDeck = true;
        }
    },1000)
}

function flipCount(){
    let flipCounting = document.querySelector(".flipCount");
    if(!isFliped){
        count++;
        flipCounting.innerHTML = `<label class="flipCount">Flip: ${count}</label>`
    }
}

function refreshGame() {
    // 1. Reset matched cards and variables
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false; // Make sure the deck is not disabled
    count = 0; // Reset flip count
    isFliped = false; // Allow flip counting again

    // 2. Reset flip count display
    let flipCounting = document.querySelector(".flipCount");
    flipCounting.innerHTML = `<label class="flipCount">Flip: ${count}</label>`;

    // 3. Shuffle the cards and reset their state
    shuffleCard(); // This will reshuffle and reset the cards

    // 4. Reset the timer and countdown display
    time = 30; // Reset time back to 30 seconds
    isCountingDown = false; // Allow countdown to restart only on card click
    let countDownTime = document.querySelector(".countdown");
    countDownTime.innerHTML = `<label class="countdown">Time: ${time}s</label>`;

    // 5. Re-enable all cards for clicking after shuffle
    cards.forEach(card => {
        card.classList.remove("flip", "shake"); // Ensure cards are back to normal state
        card.addEventListener("click", filpCard); // Re-enable click event for each card
    });
}


btn.addEventListener("click",refreshGame);