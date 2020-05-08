import * as React from 'react';
import {Component} from 'react';

import TestingSiteCard from "./components/TestingSiteCard";
import "./TestSitesPage.css";
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import GeoMap from "./components/GeoMap";


export default class TestSitesPage extends Component {
  render() {
    const data = this.props.data.cards;

    return (
        <div id="container">
          <div style={{flexGrow: 10}}>
          <NavigationBar />
          </div>
          <div style={{flexGrow: 75}}>
            <GeoMap allCards={data}/>
          </div>
          <div style={{flexGrow: 10}}>
            <SearchBar/>
          </div>
            {console.log(this.props.data)}
            {console.log(data)}
            {data.map(
                (card, index) => {
                    return (<div key={index} style={{flexGrow: 25}}>
                        <TestingSiteCard name={card.name} address={card.address}
                                         phone={card.phone} description={card.description}
                                         source={card.source} latitude={card.latitude}
                                         longitude={card.longitude} key={index}>
                        </TestingSiteCard>
                    </div>);
                }
            )}
        </div>
    );
  }
}
