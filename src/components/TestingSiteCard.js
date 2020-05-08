import React from 'react';
import {Component} from 'react';
import Card from "react-bootstrap/Card";

export default class TestingSiteCard extends Component {
    render() {
        const {name, address, phone, description, source,
        latitude, longitude} =
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

