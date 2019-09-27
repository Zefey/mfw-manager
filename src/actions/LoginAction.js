import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function loginAction(reqData) {
    return dispatch => {
        return Request.post(Config.login, reqData, (res) => {
            let {status} = res;
            if(status == 1){
                dispatch(loginSuccess(res));
            }else{
                dispatch(loginFail(res));
            }
        }, (error) => {
            let { message} = error;
            dispatch(loginFail({
                status:0,
                info:message
            }));
        })
    }
};

export function logoutAction(reqData) {
    return dispatch => {
        return Request.post(Config.logout, reqData, (res) => {
            let {status} = res;
            if(status == 1){
                dispatch(logoutSuccess(res));
            }
        }, (error) => {
            let {name , message} = error;
            console.log(name , message);
        })
    }
};


function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS,
        ...data
    };
}

function loginFail(data) {
    return {
        type: types.LOGIN_FAIL,
        ...data
    };
}


function logoutSuccess(data) {
    return {
        type: types.LOGOUT_SUCCESS,
        ...data
    };
}

