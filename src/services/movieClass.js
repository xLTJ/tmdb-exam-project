import tmdbApi from "./tmdbApi.js";

export default class Movie {
    constructor(movieDetails) {
        this.movieId = movieDetails.id;
        this.name = movieDetails.name;
    }

    // Fetches detailed data for the movie
    async fetchDetailedData() {
        try {
            this.movieDetails = await tmdbApi.getMovieDetails(this.movieId);
        } catch (error) {
            console.error(error);
        }
    }
}