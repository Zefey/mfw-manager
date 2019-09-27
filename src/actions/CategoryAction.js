import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function categoryListAction(reqData) {
    return dispatch => {
        return Request.get(Config.categoryList, reqData, (res) => {
            dispatch(categoryList(res));
        }, (error) => {
            let { message} = error;
            dispatch(categoryList({
                status:0,
                info:message,
                data:[]
            }));
        })
    }
};



function categoryList(data) {
    return {
        type: types.CATEGORY_LIST,
        ...data
    };
}
