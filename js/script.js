let todos = [];
let statusFilter = 'all'; 

function addTodo() {
    const inputTitle = document.getElementById('todo-input');
    const inputDate = document.getElementById('todo-date');

    if (inputTitle.value.trim() === '' || inputDate.value === '') {
        alert("Please fill in both fields!");
        return; 
    }

    const newTodo = {
        id: Date.now(),
        title: inputTitle.value,
        date: inputDate.value,
        completed: false
    };

    todos.push(newTodo);
    inputTitle.value = '';
    inputDate.value = '';
    renderTodos();
}

function toggleDropdown() {
    document.getElementById('dropdown-menu').classList.toggle('hidden');
}

function pilihFilter(pilihan) {
    statusFilter = pilihan;
    toggleDropdown();
    renderTodos();
}

function renderTodos() {
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = '';

    const filteredData = todos.filter(item => {
        if (statusFilter === 'pending') return item.completed === false;
        if (statusFilter === 'completed') return item.completed === true;
        return true;
    });

    if (filteredData.length === 0) {
       
        listElement.innerHTML = `
            <li class="text-center text-black py-10 bg-white border-2 border-dashed border-gray-400 rounded-lg font-bold m-2 uppercase tracking-wider">
                No tasks found
            </li>`;
        return;
    }

    filteredData.forEach((item, index) => {
      
        let rowBgClass, rowBorderClass, statusBadgeClass, taskTextStyle, dateBadgeStyle, actionBtnStyle;
        
       
        const mbClass = index === filteredData.length - 1 ? '' : 'mb-2';

        if (item.completed) {
          
            rowBgClass = "bg-gray-100"; 
            rowBorderClass = "border-2 border-gray-300 border-l-4 border-l-gray-500";
            statusBadgeClass = "bg-gray-200 text-gray-600 border-2 border-gray-300";
            taskTextStyle = "line-through text-gray-500 font-bold";
            dateBadgeStyle = "bg-gray-200 text-gray-500 border-2 border-gray-300";
            actionBtnStyle = "text-gray-400 hover:text-red-600 border-2 border-gray-300 hover:border-red-600 bg-transparent";
        } else {
           
            rowBgClass = "bg-white hover:bg-pink-50";
         
            rowBorderClass = "border-2 border-black border-l-4 border-l-pink-600";
            
            statusBadgeClass = "bg-pink-600 text-white border-2 border-black hover:bg-pink-700";
            taskTextStyle = "text-black font-black";
            dateBadgeStyle = "bg-white text-pink-600 border-2 border-black font-bold";
            actionBtnStyle = "text-black hover:text-white hover:bg-red-600 border-2 border-black bg-white";
        }
        
        const statusText = item.completed ? "COMPLETED" : "PENDING";

        listElement.innerHTML += `
            <li class="${rowBgClass} ${rowBorderClass} p-4 rounded-lg transition-all grid grid-cols-12 gap-2 items-center ${mbClass}">
                
                <div class="col-span-5 truncate ${taskTextStyle}" title="${item.title}">
                    ${item.title}
                </div>

                <div class="col-span-3 text-center text-sm font-medium flex justify-center">
                    <span class="${dateBadgeStyle} px-2 py-1 rounded-md uppercase text-xs">
                        ${item.date}
                    </span>
                </div>

                <div class="col-span-2 text-center">
                    <button onclick="toggleStatus(${item.id})" class="${statusBadgeClass} px-3 py-1.5 rounded-full text-[10px] font-black transition-all uppercase tracking-widest shadow-sm active:scale-95">
                        ${statusText}
                    </button>
                </div>

                <div class="col-span-2 text-center">
                    <button onclick="deleteSingle(${item.id})" class="${actionBtnStyle} transition-all p-2 rounded-lg shadow-sm">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>
        `;
    });
}

function toggleStatus(id) {
    todos = todos.map(item => {
        if (item.id === id) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });
    renderTodos();
}

function deleteSingle(id) {
    if(confirm("Delete this task?")) {
        todos = todos.filter(item => item.id !== id);
        renderTodos();
    }
}

function deleteAll() {
    if (confirm("Are you sure you want to DELETE ALL tasks?")) {
        todos = [];
        renderTodos();
    }
}

window.onclick = function(event) {
    if (!event.target.closest('.relative')) {
        const dropdown = document.getElementById('dropdown-menu');
        if (!dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    }
}

renderTodos();