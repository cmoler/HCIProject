import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {RegistrationPage} from "./RegistrationPage/RegistrationPage";
import {DashboardPage} from "./DashboardPage/DashboardPage";
import {Route, Switch} from "react-router";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={RegistrationPage}/>
            <Route path='/dash/:teacher' component={DashboardPage}/>
        </Switch>
    </main>
)

ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
