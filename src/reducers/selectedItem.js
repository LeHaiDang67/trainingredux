import * as types from './../constants/actionType';

const initialState = {
    id:'',
    name: '',
    status: false
};

const selectedItem = (state = initialState, action) =>{
    switch (action.type) {
        case types.GET_TASK:
            return action.task;
        case types.CLEAR_FORM:
            let clearState = {
                id:'',
                name: '',
                status: false
            };
            return clearState;
        default:
            return state;
    }
};

export default selectedItem;