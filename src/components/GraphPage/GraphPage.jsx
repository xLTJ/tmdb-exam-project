import Graph from "./Graph.jsx";
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import GraphSettings from "./GraphSettings.jsx";

export default function GraphPage() {
    const movieList = useMovieStore(state => state.movies);
    const connectionList = useMovieConnectionStore(state => state.connections);

    return (
        <div>
            <div className={"absolute z-10"}>
                <GraphSettings/>
            </div>
            <Graph graphData={{nodes: movieList, links: connectionList}}/>
        </div>
    )
}