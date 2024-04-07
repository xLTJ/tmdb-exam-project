import MovieCard from "./MovieCard.jsx";

export default function MovieCarouselDisplay({movieList}) {
    const movieCards = movieList.results.map((movie) => <MovieCard movieInfo={movie} key={movie.id}/>)

    return (
        <div
            className={'flex overflow-x-auto py-10 gap-8 gradient-mask-r-90-d scrollbar-thin'}>
            {movieCards}
        </div>
    )
}