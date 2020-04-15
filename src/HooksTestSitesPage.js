import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import TestSitesPage from "./TestSitesPage";
import * as React from 'react';


const GET_SAMPLE_CARD = gql`
    query {
        samplecard {
            name
            address
            phone
            description
            source
        }
    }
`;

export default function HooksTestSitesPage(props) {
    const { loading, error, data } = useQuery(GET_SAMPLE_CARD);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <TestSitesPage data={data}/>
    );
}
