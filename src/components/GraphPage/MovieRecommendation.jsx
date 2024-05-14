import {useMovieConnectionStore, useMovieStore} from "../../services/store.js";

// This component is a single movie recommendation card. Its used in the RecommendationList component.
export default function MovieRecommendation({currentMovie, movie, setSelectedMovie}) {
    const goToMovie = () => {
        useMovieConnectionStore.getState().addConnection(currentMovie.movieId, movie.movieId)
        setSelectedMovie(movie)
    }

    return (
        <li className={"join"}>
            <button
                className={"join-item card card-side card-compact w-full bg-neutral max-w-96 transition ease-in-out hover:bg-opacity-80 active:bg-accent active:bg-opacity-40 active:scale-95"}
                onClick={async () => {
                    useMovieStore.getState().addMovie(movie, setSelectedMovie);
                    useMovieConnectionStore.getState().addConnection(currentMovie.movieId, movie.movieId);
                }}>
                {/*Movie poster*/}
                <figure className={"max-w-12"}><img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}.jpg`}
                    alt="Movie"/></figure>
                {/*Movie name*/}
                <div className={"card-body font-bold content-center justify-center"}>
                    <p className={"text-lg flex flex-col justify-center leading-5 line-clamp-2"}>{movie.name}</p>
                </div>
            </button>
            {/*If the movie already exists, show a button to navigate directly to the movie*/}
            {useMovieStore.getState().getMovie(movie.movieId) ? <button className={"btn btn-primary h-auto font-black text-xl join-item"} onClick={goToMovie}>→</button> : null}
        </li>
    )
}