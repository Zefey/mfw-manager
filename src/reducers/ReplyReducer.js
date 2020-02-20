import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function ReplyReducer(state = initialState, action){
    switch (action.type) {
        case types.REPLY_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_REPLY:
            return Object.assign({}, state, {
                ...action
            });
        case types.REPLY_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
