import {create} from "zustand";

// State for storing the movies that are shown in the graph.
const useMovieStore = create(setState => ({
    movies: [],
    addMovie: (newMovie) => {
        if (useMovieStore.getState().movies.find((movie) => movie.movieId === newMovie.movieId)) {
            console.error("Movie Already Exists");
            return;
        }
        setState(state => ({
            movies: [...state.movies, newMovie]
        }))
    },
    removeMovie: (movieIdToRemove) => {
        setState(state => ({
            movies: state.movies.filter((movie) => movie.movieId !== movieIdToRemove)
        }));
        useMovieConnectionStore.getState().removeConnection(movieIdToRemove);
    },
    getMovie: (movieId) => {
        return useMovieStore.getState().movies.find((movie) => movie.movieId === movieId);
    }
}));

// State for storing the connections between the movies that are shown in the graph.
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
            connections: [...state.connections, {sourceId: source, targetId: target}]
        }))
    },
    removeConnection: (sourceIdToRemove) => setState(state => ({
        connections: state.connections.filter((connection) => connection.source !== sourceIdToRemove)
    }))
}))

export {useMovieStore, useMovieConnectionStore};