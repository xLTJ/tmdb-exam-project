import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";
import testMovieList from "./testMovieList.json"
import {useEffect} from "react";
import tmdbApi from "../../services/tmdbApi.js";

export default function LandingPage() {
    useEffect(() => {

        async function fetchData() {
            const movies = await tmdbApi.discoverMovies({sort_by: 'popularity.desc'});
            console.log(movies);
            return movies;
        }

        fetchData().catch(console.error);
    })

    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={'py-10'}>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Popular</h3>
                    <MovieCarouselDisplay movieList={testMovieList.popular}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Top Rated</h3>
                    {/*/discover/movie?sort_by=popularity.desc&page=1&vote_average.gte=8.0*/}
                    <MovieCarouselDisplay movieList={testMovieList.top_rated}/>
                </div>
            </main>
        </div>
    )
}