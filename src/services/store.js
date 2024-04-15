import {create} from "zustand";

// State for storing the movies that are shown in the graph.
const useMovieStore = create(setState => ({
    movies: [],
    addMovie: (newMovie) => {
        if (useMovieStore.getState().movies.find((movie) => movie.id === newMovie.id)) {
            console.error("Movie Already Exists");
            return;
        }
        setState(state => ({
            movies: [...state.movies, newMovie]
        }))
    },
    removeMovie: (movieIdToRemove) => {
        setState(state => ({
            movies: state.movies.filter((movie) => movie.id !== movieIdToRemove)
        }));
        useMovieConnectionStore.getState().removeConnection(movieIdToRemove);
    }
}));

const useMovieConnectionStore = create(setState => ({
    connections: [],
    addConnection: (source, target) => {
        if (useMovieConnectionStore.getState().connections.find((connection) => {
            return connection.source === source && connection.target === target;
        })) {
            console.error("Connection Already Exists");
            return;
        }
        setState(state => ({
            connections: [...state.connections, {source: source, target: target}]
        }))
    },
    removeConnection: (sourceIdToRemove) => setState(state => ({
        connections: state.connections.filter((connection) => connection.source !== sourceIdToRemove)
    }))
}))

export {useMovieStore, useMovieConnectionStore};