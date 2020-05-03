import React from 'react';
import {Component} from 'react';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';

import Pins from '../pins';
import TestSitePopup from './TestSitePopup';
import {MapToken} from "../constants/tokens";
import {store} from "../store/store";


const TOKEN = MapToken; // Set your mapbox token here

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

export default class GeoMap extends Component {

    _updateViewport = viewport => {
        // this.setState({viewport});
        console.log(viewport);
        let action = {
            type: "setNewViewport",
            viewport: viewport
        };
        store.dispatch(action);
    };

    _onClickMarker = testSite => {
        // this.setState({popupInfo: city});
        let action = {
            type: "setNewPopup",
            popupInfo: testSite
        };
        store.dispatch(action);
    };

    _renderPopup() {
        const {popupInfo} = store.getState();

        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() =>
                        // this.setState({popupInfo: null})
                        this._onClickMarker(null)
                    }
                >
                    <TestSitePopup info={popupInfo}/>
                </Popup>
            )
        );
    }

    render() {
        console.log(store.getState());
        const {viewport} = store.getState();
        const {allCards} = this.props;
        return (
            <MapGL
                {...viewport}
                width="100%"
                height="45vh"
                mapStyle="mapbox://styles/mapbox/light-v9"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN}
            >
                <Pins data={allCards} onClick={this._onClickMarker} />

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
        );
    }
}
