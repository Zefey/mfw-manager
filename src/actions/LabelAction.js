import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function labelListAction(reqData) {
    return dispatch => {
        return Request.get(Config.labelList, reqData, (res) => {
            dispatch(labelList(res));
        }, (error) => {
            let {message} = error;
            dispatch(labelList({
                status:0,
                info:message,
                data:[]
            }));
        })
    }
};



function labelList(data) {
    return {
        type: types.LABEL_LIST,
        ...data
    };
}
