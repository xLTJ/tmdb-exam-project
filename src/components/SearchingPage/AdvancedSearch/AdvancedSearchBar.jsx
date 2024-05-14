import {useFilterStore} from "../../../services/filterStore.js";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import movieFilters from "../../../assets/data/movieFilters.json";
import tvShowFilters from "../../../assets/data/tvShowFilters.json";
import movieGenres from "../../../assets/data/movieGenres.json";
import tvGenres from "../../../assets/data/tvGenres.json";
import tmdbApi from "../../../services/tmdbApi";
import FilterDropdown from "./DropDownMenu.jsx";
import RangeSelection from "./NumiricalSelection.jsx";

export default function AdvancedSearchBar({setSearchResults, setSearchQuery}) {
    const addFilter = useFilterStore(state => state.addFilter);
    const filters = useFilterStore(state => state.filters);
    const [isFiltersShown, setIsFiltersShown] = useState(false);
    const [selectedFilterType, setSelectedFilterType] = useState('movie');
    const [urlSearchParams] = useSearchParams();

    // Konstruer søgeparametre fra filtre og søgeforespørgsel.
    const constructSearchParams = () => {
        const options = new URLSearchParams();

        for (const [key, value] of Object.entries(filters)) {
            if (Array.isArray(value)) {
                // Hvis værdien er et array, skal du slutte elementerne med et komma for AND-operation eller en pipe for OR-operation
                options.append(key, value.join(','));
            } else if (value !== null && value !== "") {
                options.append(key, value);
            }
        }

        // Tilføj den oprindelige søgeforespørgsel til 'with_text_query'-parameteren
        options.append('with_text_query', urlSearchParams.get('q'));

        return options;
    };

    // Funktion til at håndtere filterændring for dropdowns
    const handleFilterChange = (filterName, newValue) => {
        addFilter(filterName, newValue);
    };

    // Funktion til at håndtere anvendelse af filtre
    const handleApplyFilters = async () => {
        const searchParams = constructSearchParams();
        let results;
        if (selectedFilterType === 'movie') {
            results = await tmdbApi.discoverMovies(searchParams);
        } else if (selectedFilterType === 'tv') {
            results = await tmdbApi.discoverSeries(searchParams);
        }
        setSearchResults(results.results);
    };

    // Funktion til at gengive filterdropdown eller rækkevalg baseret på filtertype
    const renderFilter = (filterCategory, filterValues, isMovie) => {
        if (filterCategory === 'with_genres' || filterCategory === 'without_genres') {
            const genres = isMovie ? movieGenres.movieGenres : tvGenres.tvGenres;
            return (
                <FilterDropdown
                    key={filterCategory}
                    title={filterCategory}
                    options={Object.entries(genres).map(([id, name]) => (
                        {value: id, label: name}
                    ))}
                    handleFilterChange={handleFilterChange}
                />
            );
        } else if (
            filterCategory === 'primary_release_date.gte' ||
            filterCategory === 'primary_release_date.lte' ||
            filterCategory === 'vote_average.gte' ||
            filterCategory === 'vote_average.lte' ||
            filterCategory === 'first_air_date.gte' ||
            filterCategory === 'first_air_date.lte' ||
            filterCategory === 'with_text_query'
        ) {
            return <RangeSelection key={filterCategory} title={filterCategory}/>;
        } else {
            return (
                <FilterDropdown
                    key={filterCategory}
                    title={filterCategory}
                    options={filterValues.map(filterValue => (
                        {value: filterValue, label: filterValue} // antager, at etiketten og værdien er den samme
                    ))}
                    handleFilterChange={handleFilterChange}
                />
            );
        }
    };

    return (
        <div className={"bg-base-300 mt-10 card min-w-96"}>
            <div className={"card-body"}>
                <h2 className={"card-title text-4xl font-bold mb-10 justify-center"}>Avanceret søgning</h2>

                {/* Tilføj knapper til at vælge filtertype */}
                <div className="flex justify-between mb-4"> {/* Tilføj denne div */}
                    <button onClick={() => setSelectedFilterType('movie')}>Filmfiltre</button>
                    <button onClick={() => setSelectedFilterType('tv')}>TV-showfiltre</button>
                </div>

                {/* Knap til at skifte filtre */}
                <button onClick={() => setIsFiltersShown(!isFiltersShown)}>
                    {isFiltersShown ? "Skjul filtre" : "Vis filtre"}
                </button>

                {/* Gengiv FilterDropdowns for hver filterkategori og knappen Anvend filtre, hvis filtre vises */}
                {isFiltersShown && (
                    <div className="flex flex-col justify-between flex-grow"> {/* Ændre denne div */}
                        <div className="w-full pr-2 flex-grow"> {/* Ændre denne div */}
                            {selectedFilterType === 'movie' && Object.entries(movieFilters).map(([filterCategory, filterValues]) => {
                                return renderFilter(filterCategory, filterValues, true);
                            })}
                        </div>

                        <div className="w-full pl-2 flex-grow"> {/* Ændre denne div */}
                            {selectedFilterType === 'tv' && Object.entries(tvShowFilters).map(([filterCategory, filterValues]) => {
                                return renderFilter(filterCategory, filterValues, false);
                            })}
                        </div>
                    </div>
                )}

                {/* Knap til at anvende filtre */}
                {isFiltersShown && (
                    <button className={"btn btn-primary"} onClick={handleApplyFilters}>Anvend filtre</button>
                )}
            </div>
        </div>
    );
}