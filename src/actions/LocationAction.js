import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function locationList() {
    return dispatch => {
        return Request.get(Config.locationList, {}, (res) => {
            dispatch({
                type: types.LOCATION_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.LOCATION_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleLocation(reqData) {
    return dispatch => {
        return Request.post(Config.handleLocation, reqData, (res) => {
            dispatch({
                type: types.HANDLE_LOCATION,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_LOCATION,
                status:0,
                info:message
            });
        })
    }
};

export function locationDelete(reqData) {
    return dispatch => {
        return Request.get(Config.locationDelete, reqData, (res) => {
            dispatch({
                type: types.LOCATION_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.LOCATION_DELETE,
                status:0,
                info:message
            });
        })
    }
};