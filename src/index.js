import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import InfoAdmin from './components/infoAdmin/infoAdmin';
import AddInfo from './components/addInfo/addInfo';
import OptionsComp from './components/optionsComp/options';
import Info from './components/info/info';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Route exact={true} path="/" component={Signup}/>
      <Route  path="/login" component={Login}/>
      <Route path="/options" component={OptionsComp} />
      <Route path="/info" component = {Info} />
      <Route path="/info2" component = {InfoAdmin} />
      <Route path="/addInfo" component = {AddInfo} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
