import * as types from './../constants/actionType';

const initialState = 0;

const sortSelected = (state = initialState, action) =>{
    switch (action.type) {
        case types.SORT_SELECTED:
            return -action.valueSelected;
        default:
            return state;
    }
};

export default sortSelected;