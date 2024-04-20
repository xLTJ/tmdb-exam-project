import {useEffect, useState} from "react";
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import RecommendationList from "./RecommendationList.jsx";

export default function GraphMovieDetails({movieId, setSelectedMovie}) {
    const movie = useMovieStore(state => state.getMovie(movieId))
    const [loadingDetails, setLoadingDetails] = useState(true)
    const [hasRecommendations, setHasRecommendations] = useState(false)

    const closeWindow = () => {
        setSelectedMovie(null);
    }

    const getMovieRecommendations = async () => {
        await movie.fetchMovieRecommendations()
        setHasRecommendations(true)
    }

    useEffect(() => {
        console.log(movie)
        setLoadingDetails(true);

        async function fetchMovieDetails() {
            await movie.fetchDetailedData()
            setLoadingDetails(false);
        }

        movie.movieDetails ? setLoadingDetails(false) : fetchMovieDetails().catch(console.error);

        if (movie.connectedMovies) setHasRecommendations(true);
    }, [movie, movieId]);

    const MovieDetails = () => {
        return (
            <div className={"flex flex-col gap-3 overflow-auto scrollbar-thin"}>
                <p className={"font-bold"}>Release date: {movie.movieDetails.release_date}</p>
                <p>{movie.movieDetails.overview}</p>
            </div>
        )
    }

    return (
        <div className={"absolute inset-0 top-16 z-10 flex flex-col justify-center items-center"}>
            <div
                className={"card card-side card-compact shrink-0 shadow-2xl bg-base-300 max-w-screen-lg max-h-80 mt-10"}>
                {loadingDetails ? null : <figure><img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.movieDetails.poster_path}.jpg`}
                    alt="Movie"/></figure>}
                <div className={"card-body max-w-96"}>
                    <h2 className={"card-title text-3xl py-0"}>{movie.name}</h2>
                    {loadingDetails ? <span className="loading loading-dots loading-lg"></span> : <MovieDetails/>}
                </div>
                <div className={"card-body min-w-40"}>
                    <h2 className={"font-bold text-center text-xl"}>Connections</h2>
                    {!hasRecommendations ?
                        <button className={"btn btn-sm btn-secondary"} onClick={getMovieRecommendations}>Get
                                                                                                         recommendations
                        </button> :
                        <RecommendationList currentMovie={movie} movieList={movie.connectedMovies}
                                            setSelectedMovie={setSelectedMovie}/>}
                </div>
            </div>
            <div className={"mt-5"}>
                <button className={"btn btn-accent btn-wide font-bold"} onClick={closeWindow}>Close</button>
            </div>
        </div>
    )
}