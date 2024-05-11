import {ForceGraph3D} from "react-force-graph";
import {useRef, useEffect, useState, useMemo} from "react";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import GraphMovieDetails from "./GraphMovieDetails.jsx";
import {key} from 'react';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import {useMovieGraphSettings} from "../../services/store.js";

export default function Graph({graphData}) {
    const graphRef = useRef();
    const [currentData, setCurrentData] = useState({nodes: [], links: []});
    const [selectedMovie, setSelectedMovie] = useState(null);

    // UseMemo to update the graphData only if the graphData changes
    const nodeSetup = useMemo(() => {
        const currentGraphNodes = graphData.nodes.map((node, index) => ({...node, id: index + 1}))

        const currentGraphLinks = graphData.links.map(link => (
            {
                ...link,
                source: currentGraphNodes.find(node => node.movieId === link.sourceId).id,
                target: currentGraphNodes.find(node => node.movieId === link.targetId).id
            }
        ));

        const currentGraph = {nodes: currentGraphNodes, links: currentGraphLinks}

        return currentGraph;
    }, [graphData]);

    // Add bloom effect to the graph
    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 5;
        bloomPass.radius = 1;
        bloomPass.threshold = 0;

        const composer = graphRef.current.postProcessingComposer()
        composer.addPass(bloomPass);
    }, []);

    // Update the graphData when the nodeSetup changes, thus updating the graph
    useEffect(() => {
        setCurrentData(nodeSetup);
    }, [nodeSetup]);

    const handleClick = (node) => {
        setSelectedMovie(node);
    }

    const nodeOverlay = node => {
        const nodeExtra = document.createElement('div');
        nodeExtra.textContent = node.name;
        nodeExtra.className = "badge badge-sm bg-opacity-50 text-white z-0"
        return new CSS2DObject(nodeExtra);
    }

    const groups = 15

    // Render the graph
    return (
        <div className={"overflow-hidden"}>
            <ForceGraph3D
                extraRenderers={[new CSS2DRenderer()]}
                graphData={currentData}
                nodeLabel="name" // Display movie titles
                ref={graphRef}
                backgroundColor={"black"}
                nodeAutoColorBy={"mainGenre"}
                linkAutoColorBy={d => graphData.nodes[ d.source ].id % groups}
                height={window.innerHeight - 64}
                onNodeClick={handleClick}
                nodeThreeObject={useMovieGraphSettings(state => state.displayNames)? nodeOverlay : null}
                nodeThreeObjectExtend={true}
            />
            {selectedMovie ?
                <GraphMovieDetails
                    key={selectedMovie.movieId}
                    movieId={selectedMovie.movieId}
                    setSelectedMovie={setSelectedMovie}
                /> : null}
        </div>
    );
}