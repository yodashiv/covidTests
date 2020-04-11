import React from 'react';
import {Component} from 'react';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";

export default class TestingSiteCard extends Component {
    render() {
        const {name, address, phone, description, source} =
            this.props;
        return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title> {name} </Card.Title>
                <Card.link className="mb-2 text-muted" href={"https://www.google.com/maps/d/viewer?mid=1UcgDEyHLXLESdACU8_r1FJ3-F1k&ie=UTF8&t=m&oe=UTF8&msa=0&ll=37.871953%2C-122.26005900000001&z=17"}>
                    {address}
                </Card.link>
                <Card.Subtitle className="mb-2 text-muted"> {phone} </Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer> Source: {source} </Card.Footer>
        </Card>
        );
    }
}

export const name = "UC Berkeley Tang Center";
export const address = "2222 Bancroft Way, Berkeley, CA 94720";
export const phone = "(510) 643-7197";
export const description = "As of April 2nd, the Tang Medical is only testing UC Berkeley Students and staff. Tang Medical Center at UC Berkeley reports a very limited testing capacity for students, and even more limited capacity for the public. As a result, the center is prioritizing testing where the result could influence decisions about clinical care or isolation housing.";
export const source = "https://uhs.berkeley.edu/coronavirus-covid-19-information";
