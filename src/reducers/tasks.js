import * as types from './../constants/actionType';

let data  = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data: [];
//control create task
const handleCreateTask = (tasks, task) => {
    let cloneTasks = tasks;
    cloneTasks.push(task);
    return cloneTasks;
};
//control delete task
const handleDeleteTask = (tasks, task) => {
    let cloneTasks1 = tasks;
    let findItem = cloneTasks1.findIndex(item => item.id === task.id);
    cloneTasks1.splice(findItem, 1);
    return cloneTasks1;
};

const handleSwitchStatus = (tasks, task) => {
    let editId = task.id;
    let updateList = tasks.map(item =>
      (item.id === editId ? { ...item, status: !task.status } : item)
    );
    return updateList;

};

const handleUpdateTask = (tasks ,task) => {
    let editId = task.id;
    let updateList = tasks.map(item =>
      (item.id === editId ? { ...item, name: task.name, status: task.status } : item)
    );
    return updateList;
};


const tasksReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            console.log(action.task);
            let addData = handleCreateTask(JSON.parse(localStorage.getItem('tasks')), action.task);
            localStorage.setItem('tasks', JSON.stringify(addData));
            return addData;
        case types.UPDATE_STATUS:
            let updateStatus = handleSwitchStatus(JSON.parse(localStorage.getItem('tasks')), action.task);
            localStorage.setItem('tasks', JSON.stringify(updateStatus));
            return updateStatus;
        case types.DELETE_TASK:
            let deleteData = handleDeleteTask(JSON.parse(localStorage.getItem('tasks')), action.task);
            localStorage.setItem('tasks', JSON.stringify(deleteData));
            return deleteData;
        case types.UPDATE_TASK:
            let updateTask = handleUpdateTask(JSON.parse(localStorage.getItem('tasks')), action.task);
            localStorage.setItem('tasks', JSON.stringify(updateTask));
            return updateTask;
        default:
            return state;
    }
};

export default tasksReducer;