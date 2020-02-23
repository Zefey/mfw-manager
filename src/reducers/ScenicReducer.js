import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function ScenicReducer(state = initialState, action){
    switch (action.type) {
        case types.SCENIC_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_SCENIC:
            return Object.assign({}, state, {
                ...action
            });
        case types.SCENIC_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
