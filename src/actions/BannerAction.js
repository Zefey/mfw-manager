import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function bannerList() {
    return dispatch => {
        return Request.get(Config.bannerList, {}, (res) => {
            dispatch({
                type: types.BANNER_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.BANNER_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleBanner(reqData) {
    return dispatch => {
        return Request.post(Config.handleBanner, reqData, (res) => {
            dispatch({
                type: types.HANDLE_BANNER,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_BANNER,
                status:0,
                info:message
            });
        })
    }
};

export function bannerDelete(reqData) {
    return dispatch => {
        return Request.get(Config.bannerDelete, reqData, (res) => {
            dispatch({
                type: types.BANNER_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.BANNER_DELETE,
                status:0,
                info:message
            });
        })
    }
};