const allQuestions = document.querySelectorAll(".accordion__question");

allQuestions.forEach((item)=>{
    item.addEventListener("click",()=>{
        const answer = item.nextElementSibling;
        item.classList.toggle("question--active");
        if (answer.classList.contains("answer--active")){
            answer.style.height= 0;
            answer.classList.remove("answer--active");
            item.querySelector(".symbol").innerHTML="+";
        }else{
            answer.classList="accordion__answer answer--active";
            answer.style.height=answer.scrollHeight + "px";
            item.querySelector(".symbol").innerHTML="-";
        }
        
    })
})
