import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import tmdbApi from "../../services/tmdbApi";
import useAddToGraph from "../../services/AddToGraph";

export default function MovieInfo() {
    const {mediaType, movieId} = useParams();
    const [details, setDetails] = useState(null);
    const addToGraph = useAddToGraph();

    useEffect(() => {
        const fetchDetails = async () => {
            console.log("Media Type: " + mediaType)
            try {
                if (mediaType === 'movie') {
                    const movieDetails = await tmdbApi.getMovieDetails(movieId);
                    console.log('Movie Details:', movieDetails)
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
        <div className="container mx-auto p-4 text-white">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">{details.title || details.name}</h1>
                <img className="block mx-auto" src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                     alt={details.title || details.name}/>
            </div>
            <div className="border border-gray-300 shadow overflow-hidden sm:rounded-lg mb-4 bg-transparent">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium">Movie Details</h3>
                    {mediaType === 'movie' && (
                        <button onClick={() => addToGraph(details)} className="btn btn-sm btn-secondary">Add Movie To
                            Graph</button>
                    )}
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Overview: {details.overview}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Release
                            Date: {details.release_date || details.first_air_date}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Genres: {details.genres.map(genre => genre.name).join(', ')}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Production
                            Companies: {details.production_companies.map(company => company.name).join(', ')}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Spoken
                            Languages: {details.spoken_languages.map(language => language.name).join(', ')}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Status: {details.status}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Vote
                            Average: {details.vote_average}</p>
                        <p className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Vote
                            Count: {details.vote_count}</p>
                    </dl>
                </div>
            </div>
        </div>
    );
}