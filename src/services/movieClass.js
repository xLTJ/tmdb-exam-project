export default class Movie {
    constructor(movieDetails) {
        this.id = movieDetails.id;
        this.name = movieDetails.name;
    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    async fetchDetailedData() {
        const detailMovieDetails = {}
        // TODO: Make it so that data is fetched

        this.genres = detailMovieDetails.genres;
        this.overview = detailMovieDetails.overview;
        this.runtime = detailMovieDetails.runtime;
    }
}