import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import TestSitesPage from "./TestSitesPage";
import * as React from 'react';
import {store} from "../store/store";
import Card from "react-bootstrap/Card";

const GET_COUNTY_CARD = gql`
    query($county: String!, $state: String) {
        cards : cardsInCountyState(countyInput: $county, stateInput: $state) {
            name
            address
            phone
            description
            source
            longitude
            latitude
        }
    }
`;

export default function HooksTestSitesPage(props) {

    const { loading, error, data } = useQuery(GET_COUNTY_CARD, {
        variables: {
            county: store.getState().countySearchTerm,
            state: store.getState().stateSearchTerm
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <TestSitesPage data={data}/>
    );
}
