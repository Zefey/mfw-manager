import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function LoginReducer(state = initialState, action){
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                type:types.LOGIN_SUCCESS,
                status:action.status,
                info:action.info
            });
		case types.LOGIN_FAIL:
            return Object.assign({}, state, {
                type:types.LOGIN_FAIL,
                status:action.status,
                info:action.info
            });
        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                type:types.LOGOUT_SUCCESS,
                status:action.status,
                info:action.info
            });
        default:
            return Object.assign({});
    }
}
