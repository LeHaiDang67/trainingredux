import * as types from './../constants/actionType';

export const listAll = () =>{
    return {
        type: types.LIST_ALL,
 
    };
};

export const addTask = (task) =>{
    return {
        type: types.ADD_TASK,
        task
    };
};

export const updateTask = (task) =>{
    return {
        type: types.UPDATE_TASK,
        task
    };
};

export const getTask = (task) =>{
    return {
        type: types.GET_TASK,
        task
    };
};

export const deleteTask = (task) => {
    return {
        type: types.DELETE_TASK,
        task
    };
};

export const toggleForm = ()=>{
    return {
        type: types.TOGGLE_FORM
    };
};

export const openForm = ()=>{
    return {
        type: types.OPEN_FORM
    };
};

export const closeForm = ()=>{
    return {
        type: types.CLOSE_FORM
    };
};

export const updateStatus = (task)=>{
    return {
        type: types.UPDATE_STATUS,
        task
    };
};

export const filterStatus = (valueStatus)=>{
    return {
        type: types.FILTER_STATUS,
        valueStatus
    };
};

export const sortTask = (valueSort) =>{
    return {
        type: types.SORT_TASK,
        valueSort
    };
};

export const sortSelected = (valueSelected) =>{
    return {
        type: types.SORT_SELECTED,
        valueSelected
    };
};

export const searchTask = (keyword) =>{
    return {
        type: types.SEARCH_TASK,
        keyword
    };
};

export const clearForm = () =>{
    return {
        type: types.CLEAR_FORM
    };
};