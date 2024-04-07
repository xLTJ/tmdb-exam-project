import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";
import testMovieList from "./testMovieList.json"

export default function LandingPage() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={'py-10'}>
                <h3 className={"text-3xl font-bold"}>Popular</h3>
                <MovieCarouselDisplay movieList={testMovieList}/>
            </main>
        </div>
    )
}