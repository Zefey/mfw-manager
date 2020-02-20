import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function RouteReducer(state = initialState, action){
    switch (action.type) {
        case types.ROUTE_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_ROUTE:
            return Object.assign({}, state, {
                ...action
            });
        case types.ROUTE_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
