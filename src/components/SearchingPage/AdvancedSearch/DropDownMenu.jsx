import {useFilterStore} from "../../../services/filterStore.js";

export default function FilterDropdown({title, options}) {
    const addFilter = useFilterStore(state => state.addFilter);

    const handleFilterChange = (value) => {
        addFilter(title, value);
    };

    return (
        <div>
            <h3>{title}</h3>
            <select onChange={(e) => handleFilterChange(e.target.value)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}