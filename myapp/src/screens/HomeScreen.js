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
                title="MovieLand Original"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />

        </>
    )
}

export default HomeScreen