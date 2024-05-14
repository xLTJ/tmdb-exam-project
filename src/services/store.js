import {create} from "zustand";

// State for storing the movies that are shown in the graph. The methods are kinda self-explanatory.
const useMovieStore = create(setState => ({
    movies: [],
    addMovie: (newMovie, setSelectedMovie) => {
        if (useMovieStore.getState().movies.find((movie) => movie.movieId === newMovie.movieId)) {
            console.log("Movie Already Exists");
            setSelectedMovie(newMovie);
            return;
        }
        setState(state => ({
            movies: [...state.movies, newMovie]
        }))
    },
    // Separate method for adding multiple movies at once. Why? Cus the singular method updates the selected movie if it already exists, causing horrible things to happen if you try to add multiple movies at once.
    addMovies: (movieList) => {
        movieList.forEach((newMovie) => {
                if (useMovieStore.getState().movies.find((movie) => movie.movieId === newMovie.movieId)) {
                    console.log("Movie Already Exists")
                    return;
                }
            setState(state => ({
                movies: [...state.movies, newMovie]
            }));
        })
    },
    removeMovie: (movieIdToRemove) => {
        setState(state => ({
            movies: state.movies.filter((movie) => movie.movieId !== movieIdToRemove)
        }));
        useMovieConnectionStore.getState().removeConnection(movieIdToRemove);
    },
    getMovie: (movieId) => {
        return useMovieStore.getState().movies.find((movie) => movie.movieId === movieId);
    },
    removeAllMovies: () => {
        setState(() => ({
            movies: []
        }));
        useMovieConnectionStore.getState().removeAllConnections()
    }
}));

// State for storing the connections between the movies that are shown in the graph. Again methods are self-explanatory.
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
    removeConnection: (movieIdToRemove) => setState(state => ({
        connections: state.connections.filter((connection) => connection.sourceId !== movieIdToRemove && connection.targetId !== movieIdToRemove)
    })),
    removeAllConnections: () => {
        setState(() => ({
            connections: [],
        }))
    }
}));

// State for storing settings for the movie graph. Rn it only stores whether to display the movie names.
const useMovieGraphSettings = create(setState => ({
    displayNames: true,
    // other settings

    toggleDisplayText: () => {
        setState(state => ({
            displayNames: !state.displayNames
        }))
    }
}))

export {useMovieStore, useMovieConnectionStore, useMovieGraphSettings};