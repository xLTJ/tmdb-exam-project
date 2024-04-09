import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";
import testMovieList from "./testMovieList.json"
import {useEffect, useState} from "react";
import tmdbApi from "../../services/tmdbApi.js";

export default function LandingPage() {
    useEffect(() => {
        async function fetchData() {
            const getPopularMovies = await tmdbApi.discoverMovies({sort_by: 'popularity.desc'});
            const getTopRatedMovies = await tmdbApi.discoverMovies({
                sortBy: 'popularity.desc',
                'vote_average.gte': 8.0
            });
            setPopularMovies(getPopularMovies);
            setTopRatedMovies(getTopRatedMovies);
        }

        fetchData().catch(console.error);
    });

    const [popularMovies, setPopularMovies] = useState({})
    const [topRatedMovies, setTopRatedMovies] = useState({})

    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={'py-10'}>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Popular</h3>
                    <MovieCarouselDisplay movieList={popularMovies}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Top Rated</h3>
                    <MovieCarouselDisplay movieList={topRatedMovies}/>
                </div>
            </main>
        </div>
    )
}