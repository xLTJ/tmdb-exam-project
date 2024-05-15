import FilterCheckbox from "./FilterCheckBox.jsx";

export default function FilterDropdown({title, options}) {
    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox"/>
            <div className="collapse-title text-xl font-bold">{title}</div>
            <div className="collapse-content flex flex-col">
                {options.map((option, index) => (
                    <FilterCheckbox key={index} filter={title} value={option.label} id={option.value}/>
                ))}
            </div>
        </div>
    );
}