const APIURL = "https://quote-garden.herokuapp.com/api/v3/quotes?page=";
const container = document.querySelector(".quotes-container");
const loadNext = document.querySelector("#load_next");
const totalPages = 7267;
async function getQuotes(){
    let i=3;
    while(i--){
        const randomPage = Math.floor(Math.random()*totalPages);
        const resp = await fetch(APIURL + randomPage);
        const respData = await resp.json();
        console.log(respData.data);
        for(quote in respData.data){
            console.log(respData.data,quote);
            const {quoteText,quoteAuthor} = respData.data[quote];
            const quoteDiv = document.createElement("div");
            quoteDiv.classList.add("quote");
            quoteDiv.innerHTML = 
            `
            <div class="cover"></div>
            <div class="category"><i class="fas fa-quote-right"></i></div>
            <div class="quote-content">
                <p class="author">${quoteAuthor}</p>
                <q class="quote-text">${quoteText}</q>
            </div>
            `;
            const quoteLen = quoteText.length;
            if (quoteLen>148) {
                if (quoteLen>250) quoteDiv.classList.add("xl-quote");
                else quoteDiv.classList.add("lg-quote");
            }
            container.appendChild(quoteDiv);
        }
    }
}
loadNext.addEventListener("click",()=>{
    getQuotes();
})
getQuotes();