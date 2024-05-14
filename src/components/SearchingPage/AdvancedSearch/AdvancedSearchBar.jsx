import {useFilterStore} from "../../../services/filterStore.js";
import {useState} from "react";
import movieFilters from "../../../assets/data/movieFilters.json";
import tvShowFilters from "../../../assets/data/tvShowFilters.json";
import movieGenres from "../../../assets/data/movieGenres.json";
import tvGenres from "../../../assets/data/tvGenres.json";
import movieWatchProviders from "../../../assets/data/movieWatchProviders.json";
import tvWatchProviders from "../../../assets/data/tvWatchProviders.json";
import tmdbApi from "../../../services/tmdbApi";
import FilterDropdown from "./DropDownMenu.jsx";
import FilterCheckbox from "./FilterCheckBox.jsx";

export default function AdvancedSearchBar({setSearchResults, setSearchQuery}) {
    const addFilter = useFilterStore(state => state.addFilter);
    const filters = useFilterStore(state => state.filters);
    const [isFiltersShown, setIsFiltersShown] = useState(false);

    // Construct search parameters from filters and search query.
    const constructSearchParams = () => {
        const options = new URLSearchParams();
        for (const [key, value] of Object.entries(filters)) {
            console.log("Filter key and value: " + key, value); // Add this line
            if (key === "Genres") {
                const genreIds = value.map(genre => {
                    const genreId = Object.keys(movieGenres).find(key => movieGenres[key] === genre);
                    return genreId || Object.keys(tvGenres).find(key => tvGenres[key] === genre);
                });
                options.append("with_genres", genreIds.join(","));
                options.append("without_genres", genreIds.join(","));
            } else if (key === "WatchProviders") {
                const providerIds = value.map(provider => {
                    const providerId = Object.keys(movieWatchProviders).find(key => movieWatchProviders[key] === provider);
                    return providerId || Object.keys(tvWatchProviders).find(key => tvWatchProviders[key] === provider);
                });
                options.append("with_watch_providers", providerIds.join(","));
            } else if (key === "ReleaseDate" || key === "VoteAverage") {
                console.log("Value for ReleaseDate or VoteAverage: ", value);
                const [gte, lte] = value.split("-");
                options.append(`${key}.gte`, gte);
                options.append(`${key}.lte`, lte);
            } else if (key === "SortBy") {
                options.append("sort_by", value);
            } else if (key === "TextQuery") {
                options.append("with_text_query", value);
            } else if (key === "include_adult") {
                options.append("include_adult", value);
            }
        }
        return options;
    };

    // Function to handle filter change for dropdowns
    const handleFilterChange = (filterName, newValue) => {
        addFilter(filterName, newValue);
    };

    // Function to handle apply filters
    const handleApplyFilters = async () => {
        const searchParams = constructSearchParams();
        const results = await tmdbApi.discoverMovies(searchParams);
        setSearchResults(results.results);
        console.log("filters applied"); // Add this line
        console.log("The results data" + results.results); // Add this line
    };

    // Function to handle normal search
    const handleSearch = async (query) => {
        const results = await tmdbApi.multiSearch(query);
        setSearchResults(results.results);
    };

    return (
        <div className={"bg-base-300 mt-10 card min-w-96"}>
            <div className={"card-body"}>
                <h2 className={"card-title text-4xl font-bold mb-10 justify-center"}>Advanced Search</h2>

                {/* Button to toggle filters */}
                <button onClick={() => setIsFiltersShown(!isFiltersShown)}>
                    {isFiltersShown ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Render FilterDropdowns for each filter category and the Apply Filters button if filters are shown */}
                {isFiltersShown && (
                    <div className="flex justify-between">
                        <div className="w-full pr-2">
                            {Object.entries(movieFilters).map(([filterCategory, filterValues]) => (
                                <FilterDropdown
                                    key={filterCategory}
                                    title={filterCategory}
                                    options={filterValues.map(filterValue => (
                                        {value: filterValue, label: filterValue} // assuming the label and value are the same
                                    ))}
                                    handleFilterChange={handleFilterChange}
                                />
                            ))}
                        </div>

                        <div className="w-full pl-2">
                            {Object.entries(tvShowFilters).map(([filterCategory, filterValues]) => (
                                <FilterDropdown
                                    key={filterCategory}
                                    title={filterCategory}
                                    options={filterValues.map(filterValue => (
                                        {value: filterValue, label: filterValue} // assuming the label and value are the same
                                    ))}
                                    handleFilterChange={handleFilterChange}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Button to apply filters */}
                {isFiltersShown && (
                    <button className={"btn btn-primary"} onClick={handleApplyFilters}>Apply Filters</button>
                )}
            </div>
        </div>
    );
}