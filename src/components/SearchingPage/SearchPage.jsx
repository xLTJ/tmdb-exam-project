import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import tmdbApi from "../../services/tmdbApi";

export default function MovieInfo() {
    const {movieId} = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const details = await tmdbApi.getMovieDetails(movieId);
                setMovieDetails(details);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{movieDetails.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title}/>
            <p>{movieDetails.overview}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            <p>Production Companies: {movieDetails.production_companies.map(company => company.name).join(', ')}</p>
            <p>Spoken Languages: {movieDetails.spoken_languages.map(language => language.name).join(', ')}</p>
            <p>Status: {movieDetails.status}</p>
            <p>Vote Average: {movieDetails.vote_average}</p>
            <p>Vote Count: {movieDetails.vote_count}</p>
        </div>
    );
}