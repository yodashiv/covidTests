import React from "react";
import {Component} from 'react';
import TestSitesPage from './TestSitesPage';
import Home from "./Home";
import "./App.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/TestingSites" component={TestSitesPage}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
