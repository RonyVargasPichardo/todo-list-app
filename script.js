document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCategory = document.getElementById('taskCategory'); // Selector de categorías

    // Cargar tareas guardadas al iniciar
    loadTasks();

    // Evento para agregar tareas al presionar "Add"
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText); // Agregar la tarea
            saveTasks(); // Guardar las tareas
            taskInput.value = ''; // Limpiar el campo de entrada
            taskInput.blur(); // Quitar el foco del input
        }
    });

    // Quitar el foco cuando se presiona "Enter"
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { // Detectar tecla "Enter"
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText); // Agregar la tarea
                saveTasks(); // Guardar las tareas
                taskInput.value = ''; // Limpiar el campo de entrada
            }
            taskInput.blur(); // Quitar el foco del input
            e.preventDefault(); // Evitar comportamiento por defecto del teclado
        }
    });

    // Quitar el foco del input si se hace clic fuera de él
    document.addEventListener('click', (e) => {
        // Si el clic no ocurre dentro del input ni del botón "Add"
        if (!taskInput.contains(e.target) && !addTaskBtn.contains(e.target)) {
            taskInput.blur(); // Quitar el foco
        }
    });

    // Función para añadir una tarea con categoría
    function addTask(taskText) {
        const category = taskCategory.value; // Obtener la categoría seleccionada
        const li = document.createElement('li');
        li.classList.add(`category-${category}`); // Añadir clase de categoría
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;
        taskList.appendChild(li);

        // Evento para completar la tarea
        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks(); // Actualizar tareas al completar
        });

        // Evento para eliminar la tarea
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks(); // Actualizar tareas al eliminar
        });
    }

    // Función para guardar las tareas en localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((li) => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed'),
                category: li.className.replace('completed', '').trim() // Guardar categoría
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar las tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = task.category; // Restaurar categoría
            if (task.completed) li.classList.add('completed'); // Restaurar estado
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn">✔</button>
                    <button class="delete-btn">✖</button>
                </div>
            `;
            taskList.appendChild(li);

            // Eventos para las tareas cargadas
            li.querySelector('.complete-btn').addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks(); // Actualizar tareas al completar
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
                saveTasks(); // Actualizar tareas al eliminar
            });
        });
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.tagName === 'INPUT') {
        document.body.style.zoom = '100%'; // Restablece el tamaño
    }
});

