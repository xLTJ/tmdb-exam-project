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
            console.log("woaw")
        } catch (error) {
            console.error(error);
        }
    }

    async fetchMovieRecommendations() {
        try {
            const recommendationsObject = await tmdbApi.getMovieRecommendations(this.movieId);
            const recommendations = recommendationsObject.results;

            this.connectedMovies = recommendations.map((movie) => {
                return new Movie({id: movie.id, name: movie.original_title})
            });
        } catch (error) {
            console.error(error);
        }
    }
}