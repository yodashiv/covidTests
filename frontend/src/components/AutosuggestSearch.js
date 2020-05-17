import {allRegions} from "../constants/constants";
import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';
import {store} from "../store/store";
import "./AutosuggestSearch.css";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
        return []
    } else {
        let results = allRegions.filter(region => {
            return region.countyAndState.toLowerCase().slice(0, inputLength) === inputValue;
        });
        return results.slice(0, 4);

    }
    // return (inputLength === 0 ? [] : allRegions.filter(region => {
    //     return region.countyAndState.toLowerCase().slice(0, inputLength) === inputValue;
    // }));
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.countyAndState;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.countyAndState}
    </div>
);

export default class AutosuggestSearch extends Component {
    onChange = (event, { newValue }) => {
        let action = {
            type: "setCurrSearchValue",
            currSearchValue: newValue
        };
        store.dispatch(action);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        let action = {
            type: "setSuggestions",
            suggestions: getSuggestions(value)
        };
        store.dispatch(action);
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        let action = {
            type: "setSuggestions",
            suggestions: []
        };
        store.dispatch(action);
    };

    shouldRenderSuggestions(value) {
        return value.trim().length > 2;
    }

    render() {
        const { currSearchValue, suggestions } = store.getState();
        let value = currSearchValue;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: "Enter your county and state. (Ex. Queens, NY)",
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}
