import * as React from 'react';
import {PureComponent} from 'react';
import Card from "react-bootstrap/Card";
import "./TestSitePopup.css";

export default class TestSitePopup extends PureComponent {
    render() {
        const {info} = this.props;
        const {name, address, phone, source} = info;

        return (
            <div className="PopupContents">
                <div>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title> {name} </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> {address} </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted"> {phone} </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                <p style={{fontSize:"0.75rem"}}>Source: {source} </p>
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}
