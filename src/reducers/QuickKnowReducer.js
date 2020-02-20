import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function QuickKnowReducer(state = initialState, action){
    switch (action.type) {
        case types.QUICK_KNOW_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_QUICK_KNOW:
            return Object.assign({}, state, {
                ...action
            });
        case types.QUICK_KNOW_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
