const todoForm=document.querySelector("form");
const todoInput=document.getElementById("todo-input");
const todoListUL=document.getElementById("todo-list");
let allTodos=loadTodos();
updateTodoList();

todoForm.addEventListener("submit",function(e){
    e.preventDefault();
    addTodo();
})
function addTodo(){
    const todoText=todoInput.value.trim();

    if(todoText.length >0){
        const todoObject={
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value="";
    }
   
}
function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo, todoIndex)=>{
        todosItem=createTodoItem(todo, todoIndex);
        todoListUL.append(todosItem);

    })

}
function createTodoItem(todo, todoIndex){
    const todoID="todo-" +todoIndex;
    const todoLI= document.createElement("li");
    const todoText= todo.text;
    todoLI.className="todo";
    todoLI.innerHTML=`
    <input type="checkbox" id=${todoID}>
                <label class="custom-checkbox" for=${todoID}>
                    <svg fill="transparent" xmlns="icons/checkbox.svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.4-1.4z"/>
                    </svg>
                    
                </label>
                <label for=${todoID} class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg  xmlns="icons/trash.svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                </button>`
       const deleteButton=todoLI.querySelector(".delete-button");
       deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
       })

       const checkbox= todoLI.querySelector("input");
       checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
       })
       checkbox.checked=todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos=allTodos.filter((_, index)=>index !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todosJSON=JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}
function loadTodos(){
    const todos=localStorage.getItem("todos") || "[]";
    return JSON.parse(todos)
}

