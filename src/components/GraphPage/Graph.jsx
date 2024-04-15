import {ForceGraph3D} from "react-force-graph";
import {useRef, useEffect, useState} from "react";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";

export default function Graph() {
    const graphRef = useRef();
    const [currentData, setCurrentData] = useState({nodes: [], links: []})

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

    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 0.6;
        bloomPass.radius = 0.5;
        bloomPass.threshold = 0;

        const composer = graphRef.current.postProcessingComposer()
        composer.addPass(bloomPass);
    }, []);

    useEffect(() => {
        setCurrentData({nodes: useMovieStore.getState().movies, links: useMovieConnectionStore.getState().connections})
    }, [currentData]);

    const groups = 15;
    // const data = {nodes: useMovieStore.getState().movies, links: useMovieConnectionStore.getState().connections}
    const data = genRandomTree(2000)

    return (
        <div className={"overflow-hidden"}>
            <ForceGraph3D
                graphData={data}
                nodeLabel="name" // Display movie titles
                ref={graphRef}
                backgroundColor={"black"}
                nodeAutoColorBy={d => d.id % groups}
                linkAutoColorBy={d => data.nodes[ d.source ].id % groups}
                height={window.innerHeight - 64}
            />
        </div>
    );
}