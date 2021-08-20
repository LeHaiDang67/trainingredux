import * as types from './../constants/actionType';

const initialState = 0;

const sortTask = (state = initialState, action) =>{
    switch (action.type) {
        case types.SORT_TASK:
            return action.valueSort;
    
        default:
            return state;
    };
};

export default sortTask;