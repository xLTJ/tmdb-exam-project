import {useFilterStore} from "../../../services/filterStore.js";
import {useState} from "react";
import movieFilters from "../../../assets/data/movieFilters.json";
import tvShowFilters from "../../../assets/data/tvShowFilters.json";
import FilterDropdown from "./DropDownMenu.jsx";
import FilterCheckbox from "./FilterCheckBox.jsx";


export default function AdvancedSearchBar({setSearchQuery}) {
    const addFilter = useFilterStore(state => state.addFilter);
    const filters = useFilterStore(state => state.filters);
    const [isFiltersShown, setIsFiltersShown] = useState(false);

    // Construct search parameters from filters and search query.
    const constructSearchParams = () => {
        const options = new URLSearchParams();
        // Include other search parameters here if needed
        for (const [key, value] of Object.entries(filters)) {
            if (Array.isArray(value)) {
                value.forEach(item => options.append(key, item));
            } else if (value !== null && value !== "") {
                options.append(key, value);
            }
        }
        return options;
    };

    // Function to handle filter change for dropdowns
    const handleFilterChange = (filterName, newValue) => {
        addFilter(filterName, newValue);
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
                    <button className={"btn btn-primary"}
                            onClick={() => setSearchQuery(constructSearchParams())}>Apply
                        Filters
                    </button>
                )}
            </div>
        </div>
    );
}