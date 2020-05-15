import React from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";
import {store} from "../store/store";

const handleSubmit = event => {
    event.preventDefault();
    let newSearchTerm = event.target.elements.searchForm.value;
    newSearchTerm = newSearchTerm.replace(/county/i,'').trim();
    let action = {
        type: "setNewSearchTerm",
        searchTerm: newSearchTerm
    };
    store.dispatch(action);
    window.location.href = "/TestingSites";
};

export default function SearchBar(props) {
    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                    <Form.Control name="searchForm" type="text" placeholder="Enter your County" />
            </form>
        </div>
    );
}
