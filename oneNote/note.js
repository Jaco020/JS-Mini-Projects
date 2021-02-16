const addNote = document.getElementById("noteAdd");
const noteContainer = document.querySelector(".note-container");

const getLocal = JSON.parse(localStorage.getItem("notes"));

if (getLocal){
    getLocal.forEach(note=>{
        createNewNote(note.text,note.date);
    })
}
addNote.addEventListener("click",()=>{
    const currentDate = getCurrentDate()
    createNewNote("",currentDate);
});
function getCurrentDate(){
    const today = new Date();
    const currentDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return currentDate;
}
function createNewNote(text,currentDate){
    const oneNote = document.createElement("div");
    oneNote.classList.add("note");
    
    oneNote.innerHTML = `
    <div class="note-nav">
        <div class="ctime">
            <i class="far fa-clock"></i>
            <p class="hidden">${currentDate}</p>
        </div>
        <i class="fab fa-markdown"></i>
        <i class="far fa-trash-alt"></i>
    </div>
    <div class="main-text">
        <div class="marked hidden"></div>
        <textarea class="note-text"></textarea>
    </div>
    `;

    const dateButton = oneNote.querySelector(".fa-clock");
    const editButton = oneNote.querySelector(".fa-markdown");
    const deleteButton = oneNote.querySelector(".fa-trash-alt");
    
    const markedCont = oneNote.querySelector(".marked");
    const noteText = oneNote.querySelector(".note-text");

    noteText.value = text;
    deleteButton.addEventListener("click",()=>{
        oneNote.remove();
        updateLocal();
    });
    dateButton.addEventListener("click",()=>{
        oneNote.querySelector("p").classList.toggle("hidden");
    })
    noteText.addEventListener("input",()=>{
        updateLocal();
    })
    editButton.addEventListener("click",()=>{
        markedCont.classList.toggle("hidden");
        noteText.classList.toggle("hidden")
    
        const textValue = noteText.value;
        markedCont.innerHTML = marked(textValue);   
    });

    noteContainer.appendChild(oneNote);
}

function updateLocal(){
    const allNotesContent = document.querySelectorAll(".note");
    const notes = [];

    allNotesContent.forEach((note)=>{
        notes.push({
            text: note.querySelector(".note-text").value,
            date: note.querySelector("p").innerText,
        });
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}
