import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import LoginReducer from './LoginReducer'
import CategoryReducer from './CategoryReducer'
import LabelReducer from './LabelReducer'
import ArticleReducer from './ArticleReducer'

export default combineReducers({
    routing: routerReducer,
    LoginReducer:LoginReducer,
    ArticleReducer:ArticleReducer,
    CategoryReducer:CategoryReducer,
    LabelReducer:LabelReducer,
})
