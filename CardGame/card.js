const cardContainer = document.querySelector(".card-container");
const CardIcons = ["fab fa-angular","fab fa-wordpress","fab fa-java","fab fa-html5","fab fa-css3-alt","fab fa-node-js","fab fa-python","fab fa-vuejs","fab fa-react","fab fa-angular","fab fa-wordpress","fab fa-java","fab fa-html5","fab fa-css3-alt","fab fa-node-js","fab fa-python","fab fa-vuejs","fab fa-react"];
const moves = document.querySelector("#moves");
const timer = document.querySelector("#timer");
var currentActive=[],match=[];
var block = false;
var matchedCards = 0;
var clicks = 0,sec=0;
document.querySelector("#play-again").addEventListener("click",()=>{
    document.querySelector(".overlay").classList=("overlay");
    cardContainer.innerHTML="";
    clicks=0,sec=0;
    moves.innerHTML="0 Moves";
    timer.innerHTML="00:00";
    createDeck();
})
function runTimer(){
    ++sec;
    timer.innerHTML=`${checkTimer(parseInt(sec/60,10))}:${checkTimer(sec%60)}`;
}
function checkTimer(val){
    return val>9 ? val : "0" + val;
}
function updateMoves(){
    clicks+=1;
    moves.innerHTML = `${clicks} Moves`
}
function checkForWin(){
    if (matchedCards==18){
        document.querySelector(".overlay").classList=("overlay overlay--active");
        clearInterval(mTimer);
    }
}
function shuffle(cardArray){
    for (let i = cardArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardArray[randIndex].style.order = i;
        cardArray[i].style.order = randIndex;
    }
}
function addCardListner(cardItem){
    cardItem.addEventListener("click",()=>{
        if(!block && currentActive[0]!=cardItem){
            updateMoves();
            cardItem.classList.add("active");
            currentActive.push(cardItem);
            match.push(cardItem.querySelector("i").classList[1]);
        }
        if(currentActive.length==2 && !block){
            block=true;
            if(match[0]!=match[1]){
                setTimeout(()=>{
                    currentActive[0].classList.remove("active");
                    currentActive[1].classList.remove("active");
                    },700)
            }
            else{
                currentActive[0].classList.add("matched");
                currentActive[1].classList.add("matched");
                matchedCards+=2;
                checkForWin();
            }
            setTimeout(()=>{block=false;currentActive=[];match=[];},710);
        }
    })
}
function createDeck(){
    CardIcons.forEach((item)=>{
        const cardItem = document.createElement("div");
        cardItem.classList="card-item";
        cardItem.innerHTML=`
        <div class="front">
            <img draggable="false" src="revers.png">
        </div>
        <div class="back">
            <div class="back-content">
                <i class="${item}"></i>
            </div>
        </div>
        `;
        addCardListner(cardItem);
        cardContainer.appendChild(cardItem);
    })
    shuffle(document.querySelectorAll(".card-item"));
    mTimer = setInterval(runTimer,1000);
};
createDeck();