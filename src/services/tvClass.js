import tmdbApi from "./tmdbApi.js";

export default class TVShow {
    constructor(tvShowDetails) {
        this.tvShowId = tvShowDetails.id;
        this.tvShowDetails = tvShowDetails;
        this.name = tvShowDetails.name;
        this.mainGenre = tvShowDetails.mainGenre;
        this.posterPath = tvShowDetails.posterPath;
    }

    // Fetches detailed data for the TV show
    async fetchDetailedData() {
        try {
            this.tvShowDetails = await tmdbApi.getSeriesDetails(this.tvShowId);
        } catch (error) {
            console.error(error);
        }
    }

}