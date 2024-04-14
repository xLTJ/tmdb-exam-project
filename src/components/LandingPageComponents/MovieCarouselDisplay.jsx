import MovieCard from "./MovieCard.jsx";

export default function MovieCarouselDisplay({movieList}) {
    let movieCards;

    if (movieList.results) {
        movieCards = movieList.results.map((movie) => <MovieCard movieInfo={movie} type={movieList.type}
                                                                 key={movie.id}/>)
    } else {
        movieCards = 'Loading'
    }

    return (
        <div
            className={'flex overflow-x-auto py-10 gap-8 gradient-mask-r-90-d scrollbar-thin'}>
            {movieCards === 'Loading' ? <h1>Loading</h1> : movieCards}
        </div>
    )
}