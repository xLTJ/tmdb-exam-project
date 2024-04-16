import {useEffect, useState} from "react";
import {useMovieStore} from "../../services/store.js";

export default function GraphMovieDetails({movieId, setMovieDetails}) {
    const movie = useMovieStore(state => state.getMovie(movieId))
    const [isLoading, setIsLoading] = useState(true)

    const closeWindow = () => {
        setMovieDetails(null);
    }

    useEffect(() => {
        console.log(movie)
        async function fetchData() {
            await movie.fetchDetailedData()
            setIsLoading(false);
        }
        fetchData().catch(console.error);
    });

    const MovieDetails = () => {
        return (
            <div className={"flex flex-col gap-3"}>
                <p className={"font-bold"}>Release date: {movie.movieDetails.release_date}</p>
                <p>{movie.movieDetails.overview}</p>
            </div>
        )
    }

    return (
        <div className={"absolute inset-0 top-16 z-10 flex justify-center items-center"}>
            <div className={"card card-side card-compact shrink-0 shadow-2xl bg-base-300 max-w-screen-lg mt-10"}>
                {isLoading ? <p>Loading</p> : <figure><img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.movieDetails.poster_path}.jpg`}
                    alt="Movie"/></figure>}
                <div className={"card-body max-w-96"}>
                    <div className={"card-actions justify-end"}>
                        <button className={"btn btn-primary btn-sm"} onClick={closeWindow}>X</button>
                    </div>
                    <h2 className={"card-title text-3xl py-0"}>{movie.name}</h2>
                    {isLoading ? <p>Loading...</p> : <MovieDetails/>}
                </div>
            </div>
        </div>
    )
}