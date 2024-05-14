import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
// This component is a single movie recommendation card. Its used in the RecommendationList component.
export default function MovieRecommendation({currentMovie, movie, setSelectedMovie}) {
    useEffect(() => {
        // Fetch movie details when the component is mounted
        movie.fetchDetailedData().catch(console.error);
    }, []);
    return (
        <li>
            <button
                className={"card card-side card-compact w-full bg-neutral max-w-96 transition ease-in-out hover:bg-opacity-80 active:bg-accent active:bg-opacity-40 active:scale-95"}
                onClick={async () => {
                    useMovieStore.getState().addMovie(movie, setSelectedMovie);
                    useMovieConnectionStore.getState().addConnection(currentMovie.movieId, movie.movieId);
                }}>
                <figure className={"max-w-12"}><img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}.jpg`}
                    alt="Movie"/></figure>
                <div className={"card-body font-bold content-center justify-center"}>
                    <p className={"text-lg flex flex-col justify-center leading-5 line-clamp-2"}>{movie.name}</p>
                </div>
            </button>
        </li>
    )
}