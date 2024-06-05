const mainTodoElem = document.querySelector(".todoListElem");    
const inputValue = document.getElementById("inputValue");      
    
const getTodoListFromLocalStorage =()=>{
     return JSON.parse(localStorage.getItem("theList"));      
}
const updateLocalStorage=(todos)=>{                                         
     return localStorage.setItem("theList",JSON.stringify(todos))       
}

let localTodoList=getTodoListFromLocalStorage () ||[];         

const createTodoElement=(currElem)=>{
    const divElem = document.createElement("div");
    divElem.classList.add("todo_div");        
    divElem.innerHTML = `<li>${currElem}</li>     
    <button class="deletebtn">Delete</button>`;
    mainTodoElem.append(divElem);
    inputValue.value = '';
}
const addToDoList = (e) => {
     e.preventDefault();
    const todoListValue=inputValue.value.trim();   
    if(!localTodoList.includes(todoListValue)){        
        localTodoList.push(todoListValue);
        localTodoList=[...new Set(localTodoList)];
        localStorage.setItem("theList",JSON.stringify(localTodoList));

        createTodoElement(inputValue.value);
    }
};
        
const loadTodos=()=>{                     
    console.log(localTodoList);             
    localTodoList.forEach(currElem =>     
        createTodoElement(currElem));
}
loadTodos();

const removeTodoElem=(e)=>{         
    const tobeRemoved=e.target;
    let listContent=tobeRemoved.previousElementSibling.innerText;
            
    localTodoList=localTodoList.filter((currElem)=>{     
        return currElem!=listContent;
    })
    console.log(localTodoList);

    updateLocalStorage(localTodoList);
}

mainTodoElem.addEventListener("click", (e) => {
     if (e.target.classList.contains('deletebtn')) {
         removeTodoElem(e);                                   
        e.target.parentElement.remove();
    }
            
});
 document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
     if (inputValue.value.trim() !== '') {                    
        addToDoList(e);
    }
});

        // mainTodoElem.addEventListener("click", (e) => {
        //     if (e.target.classList.contains('deletebtn')) {
        //         e.target.parentElement.remove();
        //     }
        // });
