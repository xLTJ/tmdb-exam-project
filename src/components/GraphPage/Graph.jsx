import {ForceGraph3D} from "react-force-graph";
import {useRef, useEffect, useState, useMemo} from "react";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

export default function Graph({graphData}) {
    const graphRef = useRef();
    const [currentData, setCurrentData] = useState({nodes: [], links: []})

    const nodeSetup = useMemo(() => {
        const currentGraph = {
            nodes: graphData.nodes.map(node => ({...node, windowActive: false})),
            links: graphData.links.map(link => ({...link}))
        };
        console.log("update")
        return currentGraph;
    }, [graphData]);

    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 0.6;
        bloomPass.radius = 0.5;
        bloomPass.threshold = 0;

        const composer = graphRef.current.postProcessingComposer()
        composer.addPass(bloomPass);
    }, []);

    useEffect(() => {
        setCurrentData(nodeSetup);
        console.log(currentData);
    }, [nodeSetup]);

    const groups = 15;
    // const data = {nodes: useMovieStore.getState().movies, links: useMovieConnectionStore.getState().connections}

    return (
        <div className={"overflow-hidden"}>
            <ForceGraph3D
                graphData={currentData}
                nodeLabel="name" // Display movie titles
                ref={graphRef}
                backgroundColor={"black"}
                nodeAutoColorBy={d => d.id % groups}
                linkAutoColorBy={d => graphData.nodes[ d.source ].id % groups}
                height={window.innerHeight - 64}
            />
        </div>
    );
}