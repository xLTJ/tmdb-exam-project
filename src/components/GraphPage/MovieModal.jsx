import {useEffect, useState} from "react";
import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import RecommendationList from "./RecommendationList.jsx";
import movieGenres from "../../assets/data/movieGenres.json"
import {Link} from "react-router-dom";

export default function MovieModal({movieId, setSelectedMovie}) {
    // Gets the movie from the store and sets the loading state. Also sets the state for recommendations.
    const movie = useMovieStore(state => state.getMovie(movieId))
    const [loadingDetails, setLoadingDetails] = useState(true)
    const [hasRecommendations, setHasRecommendations] = useState(false)

    // sets the selected movie to null, closing the movie modal
    const closeWindow = () => {
        setSelectedMovie(null);
    }

    // Gets movie recommendations for the movie.
    const getMovieRecommendations = async () => {
        await movie.fetchMovieRecommendations()
        setHasRecommendations(true)
    }

    // Fetches movie details and recommendations for the movie when the component is loaded.
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

    // Component for the movie details.
    const MovieDetails = () => {
        return (
            <div className={"flex flex-col gap-3 overflow-auto scrollbar-thin max-h-60"}>
                <p className={"font-bold"}>Release date: {movie.movieDetails.release_date}</p>
                <div className={"badge badge-neutral"}>{movieGenres.movieGenres[movie.mainGenre]}</div>
                <p className={"overflow-auto scrollbar-thin"}>{movie.movieDetails.overview}</p>
            </div>
        )
    }

    // Renders the movie modal.
    return (
        <div className={"absolute inset-0 top-16 z-10 flex flex-col justify-center items-center z-[100000]"}>
            <div
                className={"card card-side card-compact shrink-0 shadow-2xl bg-base-300 max-w-screen-lg max-h-96 mt-10"}>
                {loadingDetails ? null : <figure><img
                    className={"max-h-[27rem]"}
                    src={`https://image.tmdb.org/t/p/w500${movie.movieDetails.poster_path}.jpg`}
                    alt="Movie"/></figure>}
                <div className={"card-body max-w-96 justify-between"}>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"tooltip flex justify-start"} data-tip={movie.name}>
                            <h2 className={"card-title text-2xl py-0 font-bold line-clamp-1 text-left"}>{movie.name}</h2>
                        </div>
                        {/*If the movie details are loading, show a loading spinner. Otherwise show the movie details.*/}
                        {loadingDetails ? <span className="loading loading-dots loading-lg"></span> : <MovieDetails/>}
                    </div>
                    <div className={"join"}>
                        <Link to={`/movie/${movie.movieId}`} className={"btn btn-sm btn-neutral join-item btn-wide"}>Go to movie page</Link>
                        <button
                            className={"btn btn-sm join-item btn-error font-bold"}
                            onClick={() => {
                                closeWindow()
                                useMovieStore.getState().removeMovie(movie.movieId)
                            }}
                        >Remove</button>
                    </div>
                </div>
                <div className={"card-body min-w-40"}>
                    <h2 className={"font-bold text-center text-xl"}>Connections</h2>
                    {/*If the movie has recommendations, show the recommendations. Otherwise, show a button to get recommendations.*/}
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