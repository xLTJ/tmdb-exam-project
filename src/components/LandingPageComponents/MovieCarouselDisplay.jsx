import MovieCard from "./MovieCard.jsx";

export default function MovieCarouselDisplay() {
    return (
        <div
            className={'flex overflow-x-auto py-10 gap-8 gradient-mask-r-90-d scrollbar-thin    '}>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
        </div>
    )
}