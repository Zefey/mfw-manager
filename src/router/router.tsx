import React, {Component} from 'react';
import { HashRouter as Router, Route ,Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const Login = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
});

const Home = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loading
});

const NotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Loading
});

export default class Container extends Component{
  
  render(){
    return(
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/home" exact={true} component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
    )
  }
}
