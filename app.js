let task = [];
document.addEventListener("DOMContentLoaded", () => {
    const storedTask = JSON.parse(localStorage.getItem("task"))

    if (storedTask) {
        task = storedTask;
        updateTaskList();
        updatestats();
    }
});


const saveTask = () => {
    localStorage.setItem('task', JSON.stringify(task));

};

const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updatestats();
        saveTask();
    }
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    saveTask();
    updatestats();
    updateTaskList();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTask();
};
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = task[index].text;

    document.getElementById("saveEdit").onclick = () => {
        task[index].text = taskInput.value.trim();
        taskInput.value = "";
        updateTaskList();
        updatestats();
        saveTask();
    };

};

const updatestats = () => {
    const completeTask = task.filter((task) => task.completed).length
    const totalTask = task.length
    const progress = totalTask ? (completeTask / totalTask) * 100 : 0;
    
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTask} / ${totalTask}`;
    if (task.length && completeTask === totalTask) {
        blastConfetti();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = "";

    task.forEach((taskI, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${taskI.completed ? 'completed' : ""}">
            <input type="checkbox" class="checkbox" ${taskI.completed ? "checked" : ""}/>
            <p>${taskI.text}</p>
        </div>
        <div class="icons">
            <img src="edit.png" onclick="editTask(${index})"/>
            <img src="bin.png" onclick="deleteTask(${index})"/>
        </div>
    </div>
    `;
        listItem.querySelector(".checkbox").addEventListener("change", () => {
            toggleTaskComplete(index);
        })

        taskList.appendChild(listItem);

    });


};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault()

    addTask();

});
const blastConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, { spread: 26, startVelocity: 55, });

    fire(0.2, { spread: 60, });

    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, });

    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, });

    fire(0.1, { spread: 120, startVelocity: 45, });
}