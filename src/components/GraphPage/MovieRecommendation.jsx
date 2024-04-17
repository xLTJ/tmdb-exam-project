import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";

export default function MovieRecommendation({currentMovie, movie, setSelectedMovie}) {
    return (
        <li>
            <button
                className={"btn btn-sm btn-neutral w-full"}
                onClick={async () => {
                    useMovieStore.getState().addMovie(movie);
                    useMovieConnectionStore.getState().addConnection(currentMovie.movieId, movie.movieId);
                }}
            >{movie.name}</button>
        </li>
    )
}