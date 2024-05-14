import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MovieCard from '../LandingPageComponents/MovieCard';
import tmdbApi from "../../services/tmdbApi";
import AdvancedSearchBar from "./AdvancedSearch/AdvancedSearchBar.jsx";

export default function SearchPage() {
    const [urlSearchParams] = useSearchParams();
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [searchResults, setSearchResults] = useState([]);

    // Brug useEffect til at opdatere søgeparametre, når URL-parametre ændres
    useEffect(() => {
        const params = new URLSearchParams();
        if (urlSearchParams.get('q')) {
            params.append('q', urlSearchParams.get('q'));
        }
        setSearchParams(params);
    }, [urlSearchParams]);

    // Brug useEffect til at hente data, når søgeparametre ændres
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("normal søgning");
                const results = await tmdbApi.multiSearch(searchParams.get('q'));
                console.log("normal søgning resultater" + results.results);
                // Juster denne linje, hvis strukturen af svaret er anderledes
                setSearchResults(results.results);
            } catch (error) {
                console.error("Fejl ved hentning af søgeresultater:", error);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className="container mx-auto">
            <AdvancedSearchBar setSearchResults={setSearchResults} setSearchQuery={setSearchParams}/>
            <h1 className="text-3xl font-bold py-6">Søgeresultater for "{searchParams.get('q')}"</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Kortlægning af søgeresultater til MovieCard-komponenter */}
                {searchResults.map((item) => (
                    (item.media_type === 'movie' || item.media_type === 'tv') ?
                        <MovieCard key={item.id} movieInfo={item} type={item.media_type}/> : null
                ))}
            </div>
        </div>
    );
}