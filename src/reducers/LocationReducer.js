import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function LocationReducer(state = initialState, action){
    switch (action.type) {
        case types.LOCATION_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_LOCATION:
            return Object.assign({}, state, {
                ...action
            });
        case types.LOCATION_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
