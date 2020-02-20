import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function routeList() {
    return dispatch => {
        return Request.get(Config.routeList, {}, (res) => {
            dispatch({
                type: types.ROUTE_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.ROUTE_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleRoute(reqData) {
    return dispatch => {
        return Request.post(Config.handleRoute, reqData, (res) => {
            dispatch({
                type: types.HANDLE_ROUTE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_ROUTE,
                status:0,
                info:message
            });
        })
    }
};

export function routeDelete(reqData) {
    return dispatch => {
        return Request.get(Config.routeDelete, reqData, (res) => {
            dispatch({
                type: types.ROUTE_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.ROUTE_DELETE,
                status:0,
                info:message
            });
        })
    }
};