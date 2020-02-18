import * as types from '../constants/ActionTypes';

const initialState = {
    status:0,
    info:'',
    data:[]
};
export default function BannerReducer(state = initialState, action){
    switch (action.type) {
        case types.BANNER_LIST:
            return Object.assign({}, state, {
                ...action
            });
        case types.HANDLE_BANNER:
            return Object.assign({}, state, {
                ...action
            });
        case types.BANNER_DELETE:
            return Object.assign({}, state, {
                ...action
            });
        default:
            return Object.assign({});
    }
}
