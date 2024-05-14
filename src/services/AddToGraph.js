import {useMovieStore, useMovieConnectionStore} from "./store.js";
import {Movie} from './movieClass.js';

const useAddToGraph = () => {
    const movieStore = useMovieStore.getState();
    const connectionStore = useMovieConnectionStore.getState();

    return (details) => {
        console.log('Details for AddToGraph:', details);
        // Check if details object has an id property
        if (!details.id) {
            console.error('Details object does not have an id property:', details);
            return;
        }

        // Create a new Movie object
        const newMovie = new Movie(details);

        movieStore.addMovie(newMovie);

        // Get the first movie in the store
        const firstMovie = movieStore.movies[0];

        if (firstMovie) {
            // Check if firstMovie object has an id property
            if (!firstMovie.movieId) {
                console.error('First movie object does not have an id property:', firstMovie);
                return;
            }

            // Add a connection from the new movie to the first movie
            connectionStore.addConnection(newMovie.movieId, firstMovie.movieId);
        }

        // Log the state of the stores
        console.log(movieStore);
        console.log(connectionStore);
    }
}

export default useAddToGraph;