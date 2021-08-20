import * as types from './../constants/actionType';

const initialState = 'All';

const filterStatus = (state = initialState, action) =>{
   switch (action.type) {
       case types.FILTER_STATUS:
           return action.valueStatus;
       default:
            return state;
   };
};

export default filterStatus;