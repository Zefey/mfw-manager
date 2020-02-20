import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function quickKnowList() {
    return dispatch => {
        return Request.get(Config.quickKnowList, {}, (res) => {
            dispatch({
                type: types.QUICK_KNOW_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.QUICK_KNOW_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleQuickKnow(reqData) {
    return dispatch => {
        return Request.post(Config.handleQuickKnow, reqData, (res) => {
            dispatch({
                type: types.HANDLE_QUICK_KNOW,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_QUICK_KNOW,
                status:0,
                info:message
            });
        })
    }
};

export function quickKnowDelete(reqData) {
    return dispatch => {
        return Request.get(Config.quickKnowDelete, reqData, (res) => {
            dispatch({
                type: types.QUICK_KNOW_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.QUICK_KNOW_DELETE,
                status:0,
                info:message
            });
        })
    }
};