import tmdbApi from "./tmdbApi.js";

// Class for the Movie object, which is used to store the movie data.
export default class Movie {
    constructor(movieDetails) {
        this.movieId = movieDetails.id;
        this.name = movieDetails.name;
        this.mainGenre = movieDetails.mainGenre;
        this.posterPath = movieDetails.posterPath;
    }

    // Fetches detailed data for the movie
    async fetchDetailedData() {
        try {
            this.movieDetails = await tmdbApi.getMovieDetails(this.movieId);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetches recommendations for the movie
    async fetchMovieRecommendations() {
        try {
            const recommendationsObject = await tmdbApi.getMovieRecommendations(this.movieId);
            const recommendations = recommendationsObject.results;

            this.connectedMovies = recommendations.map((movie) => {
                return new Movie({id: movie.id, name: movie.original_title, mainGenre: movie.genre_ids[0], posterPath: movie.poster_path})
            });
        } catch (error) {
            console.error(error);
        }
    }
}