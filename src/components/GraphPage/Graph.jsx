import {ForceGraph3D} from "react-force-graph";
import {useRef, useEffect, useState, useMemo} from "react";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import MovieModal from "./MovieModal.jsx";
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import {useMovieGraphSettings, useMovieStore} from "../../services/store.js";

export default function Graph({graphData}) {
    const graphRef = useRef();
    const [currentData, setCurrentData] = useState({nodes: [], links: []});
    const [selectedMovie, setSelectedMovie] = useState(null);

    // UseMemo to update the graphData only if the graphData changes.
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

    // TODO: Before building the final version, revert to values in the comments as the bloom is less powerful on production mode
    // Add bloom effect to the graph
    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 0.5; // 5
        bloomPass.radius = 1; // 1
        bloomPass.threshold = 0; // 0

        const composer = graphRef.current.postProcessingComposer()
        composer.addPass(bloomPass);
    }, []);

    // Update the graphData when the nodeSetup changes, thus updating the graph
    useEffect(() => {
        setCurrentData(nodeSetup);
    }, [nodeSetup]);

    // What to display on the nodes, currently just the movie titles (more than that would prolly make it too cluttered)
    const nodeOverlay = node => {
        const nodeExtra = document.createElement('div');
        nodeExtra.textContent = node.name;
        nodeExtra.className = "badge badge-sm bg-opacity-50 text-white z-0"
        return new CSS2DObject(nodeExtra);
    }

    // Handle clicks on the nodes
    const handleClick = (node) => {
        setSelectedMovie(node);
    }

    // Render the graph
    return (
        <div className={"overflow-hidden"}>
            <ForceGraph3D
                extraRenderers={[new CSS2DRenderer()]} // Add the CSS2DRenderer to the graph. Needed for the nodeOverlay
                graphData={currentData} // The data to display
                nodeLabel="name" // Display movie titles when hovering over the nodes
                ref={graphRef} // Reference to the graph. Needed for the post-processing.
                backgroundColor={"black"} // Self-explanatory
                nodeAutoColorBy={"mainGenre"} // How to color the nodes. Currently by the main genre of the movie.
                linkAutoColorBy={node => node.source.mainGenre} // How to color the links. Currently by the main genre of the source node. Or well its supposed to... The link colors doesnt really matter tho so imma just leave it like this.
                height={window.innerHeight - 64} // Set the height of the graph to the height of the window minus the height of the header (using hardcoded values is bad practice, but getting the height of the header dynamically is super complicated for some reason so yeah...)
                onNodeClick={handleClick} // What to do when a node is clicked
                onNodeRightClick={(node) => useMovieStore.getState().removeMovie(node.movieId)} // What to do when a node is right-clicked. Currently removes the node from the graph.
                nodeThreeObject={useMovieGraphSettings(state => state.displayNames) ? nodeOverlay : null} // What to display on the nodes (the stuff in nodeOverlay)
                nodeThreeObjectExtend={true} // Extend the node with the stuff in nodeOverlay (meaning the nodeOverlay is displayed on the node)
            />
            {selectedMovie ?
                <MovieModal
                    key={selectedMovie.movieId}
                    movieId={selectedMovie.movieId}
                    setSelectedMovie={setSelectedMovie}
                /> : null}
        </div>
    );
}