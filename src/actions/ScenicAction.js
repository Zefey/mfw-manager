import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function scenicList() {
    return dispatch => {
        return Request.get(Config.scenicList, {}, (res) => {
            dispatch({
                type: types.SCENIC_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.SCENIC_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleScenic(reqData) {
    return dispatch => {
        return Request.post(Config.handleScenic, reqData, (res) => {
            dispatch({
                type: types.HANDLE_SCENIC,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_SCENIC,
                status:0,
                info:message
            });
        })
    }
};

export function scenicDelete(reqData) {
    return dispatch => {
        return Request.get(Config.scenicDelete, reqData, (res) => {
            dispatch({
                type: types.SCENIC_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.SCENIC_DELETE,
                status:0,
                info:message
            });
        })
    }
};