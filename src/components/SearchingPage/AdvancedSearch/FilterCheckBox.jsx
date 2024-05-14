import {useFilterStore} from "../../../services/filterStore.js";

export default function FilterCheckbox({filter, value}) {
    const addFilter = useFilterStore((state) => state.addFilter);
    const removeFilter = useFilterStore((state) => state.removeFilter);
    const filters = useFilterStore((state) => state.filters);

    // Check if the filter value is already selected
    const isChecked = Array.isArray(filters[filter])
        ? filters[filter].includes(value)
        : filters[filter] === value;

    // Handle checkbox change
    const handleChange = (e) => {
        if (e.target.checked) {
            addFilter(filter, value);
        } else {
            removeFilter(filter, value);
        }
    };

    return (
        <label className="label cursor-pointer">
            <span className="label-text">{value}</span>
            <input
                type="checkbox"
                className="checkbox"
                onChange={handleChange}
                checked={isChecked}
            />
        </label>
    );
}
