const ThemeToggler = document.getElementById("theme-toggler");
const addTodo = document.getElementById("add-todo");
const todosCont = document.querySelector(".todo-list__cont");
const itemLeft = document.querySelector(".item-left");
const clearItemsBtn = document.querySelector(".clear-option");
const sortItem = document.querySelectorAll(".sort-options__item");
const getLocal = JSON.parse(localStorage.getItem("todoItems"));
if (getLocal){
    getLocal.forEach(item=>{
        createTodo(item.text,item.complete);
    })
}
function createTodo(text,complete){
    const newTodo = document.createElement("div");
    newTodo.classList=(`todo-list__item ${complete ? "todo-list__item--complete": ""}`);
    newTodo.innerHTML=`
        <div class="todo-list__item-text">${text}</div>
        <div class="todo-list__item-delete">✕</div>
    `;
    const deleteBtn = newTodo.querySelector(".todo-list__item-delete");
    deleteBtn.addEventListener("click",()=>{
        newTodo.remove();
    });
    newTodo.addEventListener("click",()=>{
        newTodo.classList.toggle("todo-list__item--complete");
        updateItemsLeft();
        updateLocal();
    });
    todosCont.appendChild(newTodo);
    updateItemsLeft();
}
function updateLocal(){
    const allItems = document.querySelectorAll(".todo-list__item");
    const todoItems = [];
    allItems.forEach((item)=>{
        todoItems.push({
            text: item.querySelector(".todo-list__item-text").innerHTML,
            complete: item.classList.contains("todo-list__item--complete"),
        });
    });
    console.log(todoItems);
    localStorage.setItem("todoItems",JSON.stringify(todoItems));
}
function updateItemsLeft(){
    itemLeft.innerHTML=`${todosCont.childElementCount - todosCont.querySelectorAll(".todo-list__item--complete").length} items left`;
}
function sortList(option){
    function clearAllHidden(){
        document.querySelectorAll(".todo-list__item").forEach((item)=>{
            item.classList.remove("hidden");
        })
    }
    switch (option) {
        case "All":
            clearAllHidden();
            break;
        case "Active":
            clearAllHidden();
            document.querySelectorAll(".todo-list__item--complete").forEach((item)=>{
                item.classList.add("hidden");
            })
            break;
        case "Completed":
            clearAllHidden();
            document.querySelectorAll(".todo-list__item").forEach((item)=>{
                if(!item.classList.contains("todo-list__item--complete")){
                    item.classList.add("hidden");
                }
            })
            break;
        default:
            break;
    }
}
ThemeToggler.addEventListener("click",()=>{
    if (document.body.classList.contains("dark-theme")) document.body.className="light-theme transition";
    else document.body.className="dark-theme transition";
});
clearItemsBtn.addEventListener("click",()=>{
    document.querySelectorAll(".todo-list__item--complete").forEach((item)=>{
        item.remove();
        updateLocal();
    })
});
sortItem.forEach((item)=>{
    item.addEventListener("click",()=>{
        document.querySelector(".sort-option__item--active").classList.remove("sort-option__item--active");
        item.classList.add("sort-option__item--active");
        sortList(item.innerHTML);
    })
}) 
document.addEventListener("DOMContentLoaded",()=>{
    document.body.classList.add("transition");
});
addTodo.addEventListener("keypress",(e)=>{
if(e.key === "Enter"){
    createTodo(addTodo.value, false);
    addTodo.value="";
    updateLocal();
}
})