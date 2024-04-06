import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";

export default function LandingPage() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={'py-10'}>
                <h3 className={"text-3xl font-bold"}>Popular</h3>
                <MovieCarouselDisplay/>
            </main>
        </div>
    )
}