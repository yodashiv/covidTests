import React from "react";
import {Component} from 'react';
import Home from "./pages/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HooksTestSitesPage from "./pages/HooksTestSitesPage"
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize("UA-166884919-1");
    ReactGA.pageview('/home');
}

initializeReactGA();

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/TestingSites" component={HooksTestSitesPage}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
