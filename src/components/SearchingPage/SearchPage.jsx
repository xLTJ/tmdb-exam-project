import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MovieCard from '../LandingPageComponents/MovieCard';
import tmdbApi from "../../services/tmdbApi";

export default function SearchPage() {
    const [urlSearchParams] = useSearchParams();
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (urlSearchParams.get('q')) {
            params.append('q', urlSearchParams.get('q'));
        }
        setSearchParams(params);
    }, [urlSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await tmdbApi.multiSearch(searchParams.get('q'));
                setSearchResults(results.results); // Adjust this line if the structure of the response is different
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold py-6">Search Results for &quot;{searchParams.get('q')}&quot;</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((item) => (
                    item.media_type ? <MovieCard key={item.id} movieInfo={item} type={item.media_type}/> : null // Adjust this line to match the structure of your data
                ))}
            </div>
        </div>
    );
}