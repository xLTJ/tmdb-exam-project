import {ForceGraph3D} from "react-force-graph";
import {useRef, useEffect, useState, useMemo} from "react";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import GraphMovieDetails from "./GraphMovieDetails.jsx";

export default function Graph({graphData}) {
    const graphRef = useRef();
    const [currentData, setCurrentData] = useState({nodes: [], links: []});
    const [selectedMovie, setSelectedMovie] = useState(null);

    // UseMemo to update the graphData only if the graphData changes
    const nodeSetup = useMemo(() => {
        const currentGraph = {
            nodes: graphData.nodes.map((node, index) => ({...node, id: index + 1})),
            links: graphData.links.map(link => ({...link}))
        };

        console.log(currentGraph)
        return currentGraph;
    }, [graphData]);

    // Add bloom effect to the graph
    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 0.6;
        bloomPass.radius = 0.5;
        bloomPass.threshold = 0;

        const composer = graphRef.current.postProcessingComposer()
        composer.addPass(bloomPass);
    }, []);

    // Update the graphData when the nodeSetup changes, thus updating the graph
    useEffect(() => {
        console.log(graphData)
        setCurrentData(nodeSetup);
        console.log(currentData);
    }, [nodeSetup]);

    const handleClick = (node) => {
        setSelectedMovie(node);
    }

    const groups = 15;
    
    // Render the graph
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
                onNodeClick={handleClick}
            />
            {selectedMovie ? <GraphMovieDetails movieId={selectedMovie.movieId} setMovieDetails={setSelectedMovie}/> : null}
        </div>
    );
}