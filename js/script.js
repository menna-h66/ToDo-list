let inputTask = document.querySelector(".input_task")
let btnAdd = document.querySelector(".btn_add")
let ulList = document.querySelector(".tasks")
let p = document.querySelector("main p")
let arr = [];


btnAdd.addEventListener("click" , function(eo){
    eo.preventDefault();
    if(inputTask.value == ''){
       alert("Please Enter Your Task")
    }
    else{

        addToArray(inputTask.value);

        inputTask.value = '';

        if(btnAdd.classList.contains("btn_add")){
            
            showNotefication('ToDo Item Created Successfully.')
            }
            else if(btnAdd.classList.contains("update")){
            showNotefication('ToDo Item Updated Successfully.')
             btnAdd.className= 'btn_add'
            }
        }
})


function addToArray(taskTitle){
    let task={
        id : Date.now().toString(),     
        name : taskTitle,
        complated:false
    };

    arr.push(task);
    CreateTask(arr);
    addTaskToLocalStorage(arr)
}

function CreateTask(r){

    ulList.innerHTML="";

    r.forEach((task) => {
        let taskk = `
                <li id="${task.id}">
                    <h6 class="taskName"> ${task.name} </h6>

                    <div class="edits">
                        <button type="button" class="check" data-status="unchecked"><i class="fa-solid fa-check-double" data-status="unchecked"></i></button>
                        <button type="button"><i class="fa-solid fa-pen"></i></button>
                        <button type="button"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </li>
        `

    ulList.innerHTML += taskk;
    });
}

function addTaskToLocalStorage(arr){
    localStorage.setItem("task" , JSON.stringify(arr))
}

function getTaskFromLocalStorage(arr){
    let l = localStorage.getItem("task")
    if(l){
        let task = JSON.parse(l)
        CreateTask(task);
    }
}

if (localStorage.getItem("task")){
    arr = JSON.parse(localStorage.getItem("task"))
}
getTaskFromLocalStorage();

/********************************************************************************************************************** */

ulList.addEventListener("click" , (eo)=>{


    if(eo.target.className == "fa-regular fa-trash-can"){  
        eo.target.parentElement.parentElement.parentElement.remove();

        let idTask = eo.target.parentElement.parentElement.parentElement.getAttribute("id")
        
        arr = arr.filter((task) => task.id != idTask)
        addTaskToLocalStorage(arr);
        showNotefication('ToDo Item Deleted Successfully.')
    }


    else if(eo.target.dataset.status ==="unchecked"){

        for (let i = 0; i < arr.length; i++) {
              
            let idTask = eo.target.parentElement.parentElement.parentElement.getAttribute("id")
            if (arr[i].id == idTask) {
                if(arr[i].complated == false){
                    arr[i].complated = true   
                    eo.target.parentElement.classList.add('active')
                    eo.target.parentElement.parentElement.parentElement.getElementsByClassName('taskName')[0].classList.add("line");
                }else{
                    arr[i].complated = false    
                    eo.target.parentElement.classList.remove('active')
                    eo.target.parentElement.parentElement.parentElement.getElementsByClassName('taskName')[0].classList.remove("line");
                }
            }
          }
          addTaskToLocalStorage(arr);
    }
    
    else if(eo.target.classList == "fa-solid fa-pen"){
        eo.target.classList.add("color")

        const taskElement = eo.target.parentElement.parentElement.parentElement;

        const idTaskk = taskElement.id;
        const task = arr.find(t => t.id === idTaskk);
        inputTask.value = task.name;

        let idTask = eo.target.parentElement.parentElement.parentElement.getAttribute("id")
        arr = arr.filter(task => task.id !== idTask);
        addTaskToLocalStorage(arr);

        
        btnAdd.className= 'update'
        
    }
})

function showNotefication(note){
       p.style.display="block"
        p.textContent= note;
        
        window.setInterval(() => {
            p.style.display='none'
        },3000);
}