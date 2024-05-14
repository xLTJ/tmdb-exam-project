import tmdbApi from "./tmdbApi.js";

// Base class for the Media object, which is used to store the shared properties and methods of Movie and TVShow.
class Media {
    constructor(movieDetails) {
        this.movieId = movieDetails.id;
        this.name = movieDetails.name || movieDetails.title;
        this.mainGenre = movieDetails.mainGenre;
        this.posterPath = movieDetails.posterPath;
    }

    async fetchDetailedData() {
        throw new Error('fetchDetailedData not implemented');
    }
}

// Class for the Movie object, which extends Media and adds its own methods.
class Movie extends Media {
    constructor(movieDetails) {
        super(movieDetails);
    }

    // Fetches detailed data for the movie
    async fetchDetailedData() {
        try {
            this.movieDetails = await tmdbApi.getMovieDetails(this.movieId);
            this.posterPath = this.movieDetails.poster_path
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
                return new Movie({
                    id: movie.id,
                    name: movie.original_title,
                    mainGenre: movie.genre_ids[0],
                    posterPath: movie.poster_path
                })
            });
        } catch (error) {
            console.error(error);
        }
    }
}

// Class for the TVShow object, which extends Media and adds its own methods.
class TVShow extends Media {
    constructor(tvShowDetails) {
        super(tvShowDetails);
    }

    // Fetches detailed data for the TV show
    async fetchDetailedData() {
        try {
            this.tvShowDetails = await tmdbApi.getSeriesDetails(this.movieId);
            this.posterPath = this.tvShowDetails.poster_path;
        } catch (error) {
            console.error(error);
        }
    }
}

export {TVShow, Movie};