import React from 'react';
import Form from "react-bootstrap/Form";
import "./SearchBar.css";
import {store} from "../store/store";

const handleSubmit = event => {
    event.preventDefault();
    let newSearchTerm = event.target.elements.searchForm.value;
    newSearchTerm = newSearchTerm.replace(/county/i, "");
    let containsComma = newSearchTerm.includes(",");
    let searchTermAsArr = newSearchTerm.split(",");
    let state = searchTermAsArr[searchTermAsArr.length - 1].trim().toLowerCase();
    let county = searchTermAsArr.slice(0, 1).join(" ").trim().toLowerCase();
    let action = {
        type: "setNewSearchTerm",
        countySearchTerm: county,
        stateSearchTerm: state,
        containsComma: containsComma
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
                    <Form.Control name="searchForm" type="text" placeholder="Enter your County and State. (Ex. Alameda, California)"/>
            </form>
        </div>
    );
}
