import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";
import MovieRecommendation from "./MovieRecommendation.jsx";

// This component is a list of movie recommendations. Its used in the GraphMovieDetails component.
export default function RecommendationList({currentMovie, movieList, setSelectedMovie}) {
    const addAll = async () => {
        useMovieStore.getState().addMovies(currentMovie.connectedMovies)
        currentMovie.connectedMovies.forEach((newMovie) => {
            useMovieConnectionStore.getState().addConnection(currentMovie.movieId, newMovie.movieId);
        })
    }

    return (
        <ul className={"container overflow-auto scrollbar-thin flex flex-col gap-2"}>
            <li>
                <button
                    className={"btn btn-sm btn-secondary w-full"}
                    onClick={addAll}
                >Add All
                </button>
            </li>
            {movieList.map(movie =>
                <MovieRecommendation
                    currentMovie={currentMovie}
                    key={movie.id}
                    movie={movie}
                    setSelectedMovie={setSelectedMovie}
                />)}
        </ul>
    )
}