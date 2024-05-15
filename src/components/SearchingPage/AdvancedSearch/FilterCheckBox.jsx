import {useFilterStore} from "../../../services/filterStore.js";

export default function FilterCheckbox({filter, value, id}) {
    const addFilter = useFilterStore((state) => state.addFilter);
    const removeFilter = useFilterStore((state) => state.removeFilter);
    const filters = useFilterStore((state) => state.filters);

    // tjek hvis filter er allered valgt
    const isChecked = Array.isArray(filters[filter])
        ? filters[filter].includes(id)
        : filters[filter] === id;

    // Handle checkbox change
    const handleChange = (e) => {
        if (e.target.checked) {
            console.log(`Adding filter: ${filter}, id: ${id}`); // Debug log
            addFilter(filter, id);
        } else {
            console.log(`Removing filter: ${filter}, id: ${id}`); // Debug log
            removeFilter(filter, id);
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