import React from 'react';
import {Component} from 'react';

export default class AboutMessage extends Component {
    render() {
        return (
            <h1 className="font-weight-bold col-md-12" style={{textAlign: "center"}}>
                Made by college students looking to make a small contribution to a global problem.
                We hope you find this helpful!
            </h1>
        );
    }
}
