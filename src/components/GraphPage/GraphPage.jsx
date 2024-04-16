import Graph from "./Graph.jsx";
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import {useEffect, useState} from "react";
import GraphMovieDetails from "./GraphMovieDetails.jsx";

// Generate a random tree, used for testing. TODO: Maybe move this to a separate file.
function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map(i => ({id: i})),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                [ reverse ? 'target' : 'source' ]: id,
                [ reverse ? 'source' : 'target' ]: Math.round(Math.random() * (id - 1))
            }))
    };
}

export default function GraphPage() {
    const movieList = useMovieStore(state => state.movies);
    const connectionList = useMovieConnectionStore(state => state.connections);

    const testData = genRandomTree(500)

    return (
        <div>
            <Graph graphData={{nodes: movieList, links: connectionList}}/>
        </div>
    )
}