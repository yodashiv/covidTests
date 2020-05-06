import React from 'react';
import {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

const handleSubmit = event => {
    alert("Hello");
    console.log(event.target.elements.searchForm.value);
    // use lindstein algorithim to find closest county name in DB if county name is entered wrong
    // could use some other algorithim too 
    event.preventDefault();
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
