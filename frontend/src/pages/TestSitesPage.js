import * as React from 'react';
import {Component} from 'react';

import TestingSiteCard from "../components/TestingSiteCard";
import "./TestSitesPage.css";
import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";
import GeoMap from "../components/GeoMap";
import Card from "react-bootstrap/Card";
import {store} from "../store/store";


export default class TestSitesPage extends Component {

  displayCards(data) {
      let containsComma = store.getState().containsComma;
      if (!containsComma) {
          return (
              <Card>
                  <Card.Body>Please ensure that you have separated your county and state by a comma. A valid
                      example would be: Alameda, California or Queens, NY</Card.Body>
              </Card>
          );
      }

      if (data === undefined || data.length === 0) {
          return (
              <Card>
                  <Card.Body>No test sites were found in that county. Please
                  call your local health provider for more information on COVID-19 testing options near you.</Card.Body>
              </Card>
          );
      }

      return (data.map(
            (card, index) => {
                return (<div key={index} style={{flexGrow: 25}}>
                    <TestingSiteCard name={card.name} address={card.address}
                                     phone={card.phone} description={card.description}
                                     source={card.source} latitude={card.latitude}
                                     longitude={card.longitude} key={index}>
                    </TestingSiteCard>
                </div>);
            }
        ));
    }

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
            {this.displayCards(data)}
        </div>
    );
  }
}
