import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function replyList() {
    return dispatch => {
        return Request.get(Config.replyList, {}, (res) => {
            dispatch({
                type: types.REPLY_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.REPLY_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleReply(reqData) {
    return dispatch => {
        return Request.post(Config.handleReply, reqData, (res) => {
            dispatch({
                type: types.HANDLE_REPLY,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_REPLY,
                status:0,
                info:message
            });
        })
    }
};

export function replyDelete(reqData) {
    return dispatch => {
        return Request.get(Config.replyDelete, reqData, (res) => {
            dispatch({
                type: types.REPLY_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.REPLY_DELETE,
                status:0,
                info:message
            });
        })
    }
};