import React from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";
import {store} from "../store/store";

const handleSubmit = event => {
    event.preventDefault();
    let newSearchTerm = event.target.elements.searchForm.value;
    newSearchTerm = newSearchTerm.replace(/county/i, "").replace(/,/i, "").trim();
    let searchTermAsArr = newSearchTerm.split(" ");
    let state = searchTermAsArr[searchTermAsArr.length - 1].trim();
    let county = searchTermAsArr.slice(0, searchTermAsArr.length - 1).join(" ").trim();
    let action = {
        type: "setNewSearchTerm",
        countySearchTerm: county,
        stateSearchTerm: state
    };
    store.dispatch(action);
    if (window.location.pathname !== "/TestingSites") {
        window.location.href = "/TestingSites";
    }
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
