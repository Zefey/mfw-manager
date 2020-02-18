import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import LoginReducer from './LoginReducer'
import BannerReducer from './BannerReducer'

export default combineReducers({
    routing: routerReducer,
    LoginReducer,
    BannerReducer,
})
