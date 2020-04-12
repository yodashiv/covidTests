import React from 'react';
import {Component} from 'react';
import Card from "react-bootstrap/Card";

export default class TestingSiteCard extends Component {
    render() {
        const {name, address, phone, description, source} =
            this.props;
        return (
        <Card border="secondary">
            <Card.Body>
                <Card.Title> {name} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {address} </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"> {phone} </Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    <p style={{fontSize:"0.75rem"}}>Source: {source} </p>
                </Card.Subtitle>
            </Card.Body>
        </Card>
        );
    }
}

export const name = "UC Berkeley Tang Center";
export const address = "2222 Bancroft Way, Berkeley, CA 94720";
export const phone = "(510) 643-7197";
export const description = "As of April 2nd, the Tang Medical is only testing UC Berkeley Students and staff. Tang Medical Center at UC Berkeley reports a very limited testing capacity for students, and even more limited capacity for the public. As a result, the center is prioritizing testing where the result could influence decisions about clinical care or isolation housing.";
export const source = "https://uhs.berkeley.edu/coronavirus-covid-19-information";
