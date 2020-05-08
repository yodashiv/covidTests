import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import TestSitesPage from "./TestSitesPage";
import * as React from 'react';
import {store} from "./store/store";

const GET_COUNTY_CARD = gql`
    query($county: String!) {
        cards : cardsInCounty(countyInput: $county) {
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
            county: store.getState().searchTerm
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <TestSitesPage data={data}/>
    );
}
