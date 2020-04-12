import React from 'react';
import {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

export default class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar">
            <Form.Group>
                <Form.Control type="text" placeholder="Enter zipcode" />
            </Form.Group>
            </div>
        );
    }
}
