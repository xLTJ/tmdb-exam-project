import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";
import testMovieList from "./testMovieList.json"

export default function LandingPage() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={'py-10'}>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold"}>Popular</h3>
                    <MovieCarouselDisplay movieList={testMovieList.popular}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold"}>Top Rated</h3>
                    {/*/discover/movie?sort_by=popularity.desc&page=1&vote_average.gte=8.0*/}
                    <MovieCarouselDisplay movieList={testMovieList.top_rated}/>
                </div>
            </main>
        </div>
    )
}