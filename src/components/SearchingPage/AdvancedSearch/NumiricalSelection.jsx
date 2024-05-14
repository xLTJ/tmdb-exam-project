import {useState} from "react";
import {useFilterStore} from "./store"; // Import your filter store

export default function RangeSelection({title}) {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const addFilter = useFilterStore(state => state.addFilter);

    const handleApplyRange = () => {
        addFilter("yearRange", `${minValue}-${maxValue}`);
    };

    return (
        <div>
            <h3>{title}</h3>
            <input type="text" value={minValue} onChange={(e) => setMinValue(e.target.value)}/>
            <input type="text" value={maxValue} onChange={(e) => setMaxValue(e.target.value)}/>
            <button onClick={handleApplyRange}>Apply Range</button>
        </div>
    );
}