import {create} from "zustand";

// State for storing the movies that are shown in the graph.
const useMovieStore= create(setState => ({
    movies: [],
    addMovie: (newMovie) => setState(state => ({ movies: [...state.movies, newMovie] })),
    removeMovie: (movieIdToRemove) => setState(state => ({
        movies: state.movies.filter((movie) => movie.id !== movieIdToRemove)
    }))
}));

export {useMovieStore};