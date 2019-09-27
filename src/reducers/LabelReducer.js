import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function LabelReducer(state = initialState, action){
    switch (action.type) {
        case types.LABEL_LIST:
            return Object.assign({}, state, {
                status:action.status,
                data:action.data
            });
        default:
            return Object.assign({}, state);
    }
}
