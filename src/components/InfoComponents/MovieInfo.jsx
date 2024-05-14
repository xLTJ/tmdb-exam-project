import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import tmdbApi from "../../services/tmdbApi";

export default function MovieInfo() {
    const {mediaType, movieId} = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            console.log("Media Type: " + mediaType)
            try {
                if (mediaType === 'movie') {
                    const movieDetails = await tmdbApi.getMovieDetails(movieId);
                    console.log(`Movie Details: ${movieDetails}`)
                    setDetails(movieDetails);
                } else if (mediaType === 'tv') {
                    const seriesDetails = await tmdbApi.getSeriesDetails(movieId);
                    setDetails(seriesDetails);
                }
            } catch (error) {
                console.error(`Error fetching ${mediaType} details:`, error);
            }
        };

        fetchDetails();
    }, [mediaType, movieId]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{details.title || details.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title || details.name}/>
            <p>{details.overview}</p>
            <p>Release Date: {details.release_date || details.first_air_date}</p>
            <p>Genres: {details.genres.map(genre => genre.name).join(', ')}</p>
            <p>Production Companies: {details.production_companies.map(company => company.name).join(', ')}</p>
            <p>Spoken Languages: {details.spoken_languages.map(language => language.name).join(', ')}</p>
            <p>Status: {details.status}</p>
            <p>Vote Average: {details.vote_average}</p>
            <p>Vote Count: {details.vote_count}</p>
        </div>
    );
}