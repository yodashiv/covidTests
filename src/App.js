import * as React from 'react';
import {Component} from 'react';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';

import Pins from './pins';
import CityInfo from './city-info';
import TestingSiteCard, {name, address, phone, description, source} from "./components/TestingSiteCard";
import CITIES from './cities.json';


const TOKEN = 'pk.eyJ1Ijoic2hpdmFtLXBhdGVsIiwiYSI6ImNrOGt2aHM0NDA2MW4zbG8wdXl3YXNlcDIifQ.sMejLmWJNhzSRGpSO_pXcQ'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onClickMarker = city => {
    this.setState({popupInfo: city});
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
        popupInfo && (
            <Popup
                tipSize={5}
                anchor="top"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeOnClick={false}
                onClose={() => this.setState({popupInfo: null})}
            >
              <CityInfo info={popupInfo} />
            </Popup>
        )
    );
  }

  render() {
    const {viewport} = this.state;

    return (
        <div>
          <TestingSiteCard name={name} address={address}
                           phone={phone} description={description}
                           source={source}>
          </TestingSiteCard>
          <MapGL
              {...viewport}
              width="100vw"
              height="100vh"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={this._updateViewport}
              mapboxApiAccessToken={TOKEN}
          >
            <Pins data={CITIES} onClick={this._onClickMarker} />

            {this._renderPopup()}

            <div style={fullscreenControlStyle}>
              <FullscreenControl />
            </div>
            <div style={navStyle}>
              <NavigationControl />
            </div>
            <div style={scaleControlStyle}>
              <ScaleControl />
            </div>
          </MapGL>
        </div>
    );
  }
}
