import * as types from '../constants/ActionTypes';

import Config from '../utils/Config';
import Request from '../utils/Request';

export function articleAddAction(reqData) {
    return dispatch => {
        return Request.post(Config.articleAdd, reqData, (res) => {
            dispatch(articleAdd(res));
        }, (error) => {
            let { message} = error;
            dispatch(articleAdd({
                status:0,
                info:message
            }));
        })
    }
};

export function articleDeleteAction(reqData) {
    return dispatch => {
        return Request.post(Config.articleDelete, reqData, (res) => {
            dispatch(articleDelete(res));
        }, (error) => {
            let { message} = error;
            dispatch(articleDelete({
                status:0,
                info:message
            }));
        })
    }
};

export function articleUpdateAction(reqData) {
    return dispatch => {
        return Request.post(Config.articleUpdate, reqData, (res) => {
            dispatch(articleUpdate(res));
        }, (error) => {
            let { message} = error;
            dispatch(articleUpdate({
                status:0,
                info:message
            }));
        })
    }
};

export function articleListAction(reqData) {
    return dispatch => {
        return Request.get(Config.articleList, reqData, (res) => {
            dispatch(articleList(res));
        }, (error) => {
            let { message} = error;
            dispatch(articleList({
                status:0,
                info:message,
                data:[]
            }));
        })
    }
};

function articleAdd(data) {
    return {
        type: types.ARTICLE_ADD,
        ...data
    };
}

function articleDelete(data) {
    return {
        type: types.ARTICLE_DELETE,
        ...data
    };
}

function articleUpdate(data) {
    return {
        type: types.ARTICLE_UPDATE,
        ...data
    };
}

function articleList(data) {
    return {
        type: types.ARTICLE_LIST,
        ...data
    };
}
