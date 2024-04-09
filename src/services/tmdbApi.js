const APIKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDAzYTFlOTI5Njc1OTQzOGVkZjg4NGViYWRkYTQwZCIsInN1YiI6IjY1ZWVkYzRjZTcyZmU4MDE4NTVjNTg0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uT5Oez9JN_haaKtA3fLju9u6gcToAhF6TrUiIlVLMxo"
const TmdbApi = {
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

        return response;
    }
}

export default TmdbApi;