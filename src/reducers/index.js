import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import selectedItem from './selectedItem';
import sortSelected from './sortSelected';
import filterStatus from './filterStatus';
import sortTask from './sortTask';
import searchTask from './searchTask';

const myReducers = combineReducers({
    tasks,
    isDisplayForm,
    selectedItem,
    sortSelected,
    filterStatus,
    sortTask,
    searchTask
});

export default myReducers;