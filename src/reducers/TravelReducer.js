import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function TravelReducer(state = initialState, action){
    switch (action.type) {
        case types.TRAVEL_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_TRAVEL:
            return Object.assign({}, state, {
                ...action
            });
        case types.TRAVEL_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
