import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function travelList() {
    return dispatch => {
        return Request.get(Config.travelList, {}, (res) => {
            dispatch({
                type: types.TRAVEL_LIST,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.TRAVEL_LIST,
                status:0,
                info:message
            });
        })
    }
};

export function handleTravel(reqData) {
    return dispatch => {
        return Request.post(Config.handleTravel, reqData, (res) => {
            dispatch({
                type: types.HANDLE_TRAVEL,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.HANDLE_TRAVEL,
                status:0,
                info:message
            });
        })
    }
};

export function travelDelete(reqData) {
    return dispatch => {
        return Request.get(Config.travelDelete, reqData, (res) => {
            dispatch({
                type: types.TRAVEL_DELETE,
                ...res
            });
        }, (error) => {
            let { message} = error;
            dispatch({
                type: types.TRAVEL_DELETE,
                status:0,
                info:message
            });
        })
    }
};