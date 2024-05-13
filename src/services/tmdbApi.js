const APIKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTY2M2Y4YjI3YWQwYzQyMjE4MmMyM2M4YmU4OTM5YSIsInN1YiI6IjY1YzMzMDJiYjc2Y2JiMDE2YjBmY2UxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6AvmVDtqBLzx4mB1LmZyEA7D9LEa6MWY-bbmnGea2U0";
const TmdbApi = {
    // Calls the TMDB API to perform a multi search
    async multiSearch(query) {
        const searchParams = new URLSearchParams({
            query: query,
            include_adult: false,
            language: 'en-US',
            page: 1
        }).toString();

        const payload = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${APIKey}`
            },
        }

        const body = await fetch(`https://api.themoviedb.org/3/search/multi?${searchParams}`, payload)
        const response = await body.json();
        return response;
    },
    // Calls the TMDB API to discover movies
    async discoverMovies(options) {
        const searchParams = new URLSearchParams(options).toString();
        const payload = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${APIKey}`
            },
        }

        const body = await fetch(`https://api.themoviedb.org/3/discover/movie?${searchParams}`, payload)
        const response = await body.json();
        response.type = 'movie';

        return response;
    },

    // Calls the TMDB API to discover series
    async discoverSeries(options) {
        const searchParams = new URLSearchParams(options).toString();
        const payload = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${APIKey}`
            },
        }

        const body = await fetch(`https://api.themoviedb.org/3/discover/tv?${searchParams}`, payload)
        const response = await body.json();
        response.type = 'tv';

        return response;
    },

    // Calls the TMDB API to get movie details
    async getMovieDetails(id) {
        const payload = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${APIKey}`
            },
        }

        const body = await fetch(`https://api.themoviedb.org/3/movie/${id}`, payload)
        const response = await body.json();
        return response;
    },

    async getMovieRecommendations(id) {
        const payload = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${APIKey}`
            },
        }

        const body = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, payload)
        const response = await body.json();
        return response;
    }
}

export default TmdbApi;