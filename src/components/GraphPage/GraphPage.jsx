import Graph from "./Graph.jsx";
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import {useEffect, useState} from "react";
import GraphMovieDetails from "./GraphMovieDetails.jsx";

export default function GraphPage() {
    const movieList = useMovieStore(state => state.movies);
    const connectionList = useMovieConnectionStore(state => state.connections);

    return (
        <div>
            <Graph graphData={{nodes: movieList, links: connectionList}}/>
        </div>
    )
}