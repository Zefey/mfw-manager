import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function ArticleReducer(state = initialState, action){
    switch (action.type) {
        case types.ARTICLE_LIST:
            return Object.assign({}, state, {
                type:types.ARTICLE_LIST,
                status:action.status,
                data:action.data
            });
        case types.ARTICLE_ADD:
            return Object.assign({}, state, {
                type:types.ARTICLE_ADD,
                status:action.status,
                info:action.info
            });
        case types.ARTICLE_UPDATE:
            return Object.assign({}, state, {
                type:types.ARTICLE_UPDATE,
                status:action.status,
                info:action.info
            });
        case types.ARTICLE_DELETE:
            return Object.assign({}, state, {
                type:types.ARTICLE_DELETE,
                status:action.status,
                info:action.info
            });
        default:
            return Object.assign({});
    }
}
