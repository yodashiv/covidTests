import React from "react";
import {Component} from 'react';
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HooksTestSitesPage from "./HooksTestSitesPage";


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
