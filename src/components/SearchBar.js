import React from 'react';
import {Component} from 'react';
import Form from "react-bootstrap/Form";

export default class SearchBar extends Component {
    render() {
        return (
            <Form.Group>
                <Form.Control type="text" placeholder="Enter zipcode" />
            </Form.Group>
        );
    }
}
