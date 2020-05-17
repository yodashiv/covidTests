import React from 'react';
import {Component} from 'react';
import handwashing from "../images/handwashing.svg";
import NavigationBar from "../components/NavigationBar";
import IntroMessage from "../components/IntroMessage";
import SearchBar from "../components/SearchBar";

export default class Home extends Component {
    render() {
        return (
            <div id="backoverlay">
                <div id='main'>
                    <div style={{flexGrow: 10}}>
                        <NavigationBar/>
                    </div>
                    <div className="imgcontainer">
                        <img className="coronaimg" src={mask} alt="mask Image"/>
                    </div>
                    <div id="intro" style={{flexGrow:30}}>
                        <IntroMessage/>
                    </div>
                    <div id="searchbar">
                        <SearchBar/>
                    </div>
                    <div className="imgcontainer">
                        <img className="coronaimg" src={virus} alt="v Image"/>
                    </div>
                </div>
            </div>
        );
    }
}
