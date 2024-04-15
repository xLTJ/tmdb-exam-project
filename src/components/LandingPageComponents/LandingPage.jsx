import Hero from "./Hero.jsx";
import MovieCarouselDisplay from "./MovieCarouselDisplay.jsx";
import testMovieList from "./testMovieList.json"
import {useEffect, useState} from "react";
import tmdbApi from "../../services/tmdbApi.js";

export default function LandingPage() {
    useEffect(() => {
        async function fetchData() {
            setPopularMovies(await tmdbApi.discoverMovies({sort_by: 'popularity.desc'}));
            setTopRatedMovies(await tmdbApi.discoverMovies({
                sortBy: 'popularity.desc',
                'vote_average.gte': 8.0
            }));

            setPopularSeries(await tmdbApi.discoverSeries({sort_by: 'popularity.desc'}));
            setTopRatedSeries(await tmdbApi.discoverSeries({
                sortBy: 'popularity.desc',
                'vote_average.gte': 8.0
            }));
        }

        fetchData().catch(console.error);
    });

    const [popularMovies, setPopularMovies] = useState({});
    const [topRatedMovies, setTopRatedMovies] = useState({});
    const [popularSeries, setPopularSeries] = useState({});
    const [topRatedSeries, setTopRatedSeries] = useState({});

    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <main className={"py-10"}>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Popular</h3>
                    <MovieCarouselDisplay movieList={popularMovies}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Top Rated</h3>
                    <MovieCarouselDisplay movieList={topRatedMovies}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Popular Series</h3>
                    <MovieCarouselDisplay movieList={popularSeries}/>
                </div>
                <div className={"container mb-10"}>
                    <h3 className={"text-3xl font-bold ml-6"}>Top Rated Series</h3>
                    <MovieCarouselDisplay movieList={topRatedSeries}/>
                </div>
            </main>
        </div>
    )
}