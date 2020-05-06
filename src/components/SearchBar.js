import React from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import {store} from "../store/store";

const handleSubmit = event => {
    event.preventDefault();
    alert("Hello");
    console.log(event.target.elements.searchForm.value);
    let newSearchTerm = event.target.elements.searchForm.value;
    let action = {
        type: "setNewSearchTerm",
        searchTerm: newSearchTerm
    }
    store.dispatch(action);
    // use lindstein algorithim to find closest county name in DB if county name is entered wrong
    // could use some other algorithim too
}

export default function SearchBar(props) {
    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                    <Form.Control name="searchForm" type="text" placeholder="Enter zipcode" />
            </form>
        </div>
    );
}
