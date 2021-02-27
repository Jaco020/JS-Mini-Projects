const prevBtn = document.querySelector(".prev-element");
const nextBtn = document.querySelector(".next-element");
const imgContainer = document.querySelector(".images-cont");
const img = imgContainer.querySelectorAll("img");
const allBullets = document.querySelectorAll(".bullet");
var index = 0, move = 0, imgWidth = document.querySelector(".slider-container").offsetWidth, animDur = 5000; 
console.log(imgWidth);
function runNext(){
    index++;
    if(index> img.length-1){
        index = 0
    }
    move = -index*imgWidth;
    imgContainer.style.transform = `translateX(${move}px)`;
}
function runPrev(){
    index--;
    if(index < 0){
        index = img.length -1
    }
    move = -index*imgWidth;
    imgContainer.style.transform = `translateX(${move}px)`;
}
function changeSlide(){
    removeActiveBullet();
    runNext();
    addActiveBullet();
}
function removeActiveBullet(){
    allBullets[index].classList.remove("active");
}
function addActiveBullet(){
    allBullets[index].classList.add("active");
}
var ImgChange = setInterval(changeSlide,animDur);

prevBtn.addEventListener("click",()=>{
    clearInterval(ImgChange);
    removeActiveBullet();
    runPrev();
    addActiveBullet();
    ImgChange = setInterval(changeSlide,animDur);
})
nextBtn.addEventListener("click",()=>{
    clearInterval(ImgChange);
    removeActiveBullet();
    runNext();
    addActiveBullet();
    ImgChange = setInterval(changeSlide,animDur);
})
allBullets.forEach((slideBullet)=>{
    slideBullet.addEventListener("click",()=>{
        clearInterval(ImgChange);
        removeActiveBullet();
        index = slideBullet.id.slice(-1);
        move = -index*imgWidth;
        imgContainer.style.transform = `translateX(${move}px)`;
        addActiveBullet();
        ImgChange = setInterval(changeSlide,animDur);
    })
})