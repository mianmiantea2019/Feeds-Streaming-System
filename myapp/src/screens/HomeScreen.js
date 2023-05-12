import React from 'react'
import Banner from '../Banner'
import Nav from '../Nav'
import Row from '../Row'
import requests from "../Requests";

function HomeScreen() {
    return (
        <>
            <Nav />
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
        </>
    )
}

export default HomeScreen