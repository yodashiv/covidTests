import React from 'react';
import {Component} from 'react';
import "./BuyMeACoffee.css";

export default class BuyMeACoffee extends Component {
    render() {
        return (
            <a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/Y10KMNE0">
                <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                     alt="Buy me a coffee"/>
                    <span style={{marginLeft: 15}}> Buy me a coffee </span>
                </a>
        );
    }
}
