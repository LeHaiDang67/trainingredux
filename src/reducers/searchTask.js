import * as types from './../constants/actionType';

const initialState = '';

const searchTask = (state = initialState, action) =>{
    switch (action.type) {
        case types.SEARCH_TASK:
            return action.keyword;   
        default:
            return state;
    };
};

export default searchTask;