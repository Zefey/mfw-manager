import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import LoginReducer from './LoginReducer'
import BannerReducer from './BannerReducer'
import LocationReducer from './LocationReducer'
import QuickKnowReducer from './QuickKnowReducer'
import ReplyReducer from './ReplyReducer'
import RouteReducer from './RouteReducer'
import TravelReducer from './TravelReducer'
import ScenicReducer from './ScenicReducer'

export default combineReducers({
    routing: routerReducer,
    LoginReducer,
    BannerReducer,
    LocationReducer,
    QuickKnowReducer,
    ReplyReducer,
    RouteReducer,
    TravelReducer,
    ScenicReducer,
})
