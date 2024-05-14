import {useFilterStore} from "../../../services/filterStore.js";
import FilterList from "../../../assets/data/filters.json";
import FilterDropdown from "./DropDownMenu.jsx";
import FilterCheckbox from "./FilterCheckBox.jsx";

export default function AdvancedSearchBar({setSearchQuery}) {
    const addFilter = useFilterStore(state => state.addFilter);
    const filters = useFilterStore(state => state.filters);

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

                {/* Render FilterDropdowns for each filter category */}
                {Object.entries(FilterList.movieFilters).map(([filterCategory, filterValues]) => (
                    <FilterDropdown
                        key={filterCategory}
                        title={filterCategory}
                        options={filterValues.map(filterValue => (
                            <FilterCheckbox key={filterValue} filter={filterCategory} value={filterValue}/>
                        ))}
                        handleFilterChange={handleFilterChange}
                    />
                ))}

                {/* Button to apply filters */}
                <button className={"btn btn-primary"} onClick={() => setSearchQuery(constructSearchParams())}>Apply
                    Filters
                </button>
            </div>
        </div>
    );
}