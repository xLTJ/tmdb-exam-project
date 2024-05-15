import {useState} from "react";
import {useFilterStore} from "../../../services/filterStore.js";

export default function RangeSelection({title}) {
    const [date, setDate] = useState("");
    const [query, setQuery] = useState("");
    const [vote, setVote] = useState("");
    // Hent addFilter funktionen fra filterStore
    const addFilter = useFilterStore(state => state.addFilter);

    // Funktion til at håndtere anvendelse af rækkevidde
    const handleApplyRange = () => {
        // Hvis titlen matcher en af de følgende, tilføj filteret med datoen
        if (
            title === 'primary_release_date.gte' ||
            title === 'primary_release_date.lte' ||
            title === 'first_air_date.gte' ||
            title === 'first_air_date.lte'
        ) {
            addFilter(title, date);
        } else if (title === 'with_text_query') {
            // Hvis titlen er 'with_text_query', tilføj filteret med forespørgslen
            addFilter(title, query);
        } else if (title === 'vote_average.gte' || title === 'vote_average.lte') {
            // Hvis titlen er 'vote_average.gte' eller 'vote_average.lte', konverter stemmen til en float og tilføj filteret
            const floatVote = parseFloat(vote);
            if (!isNaN(floatVote)) {
                addFilter(title, floatVote);
            }
        }
    };

    return (
        <div>
            <h3>{title}</h3>
            {/* Hvis titlen matcher en af de følgende, vis en dato input */}
            {title === 'primary_release_date.gte' ||
            title === 'primary_release_date.lte' ||
            title === 'first_air_date.gte' ||
            title === 'first_air_date.lte' ? (
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onBlur={handleApplyRange}
                />
            ) : title === 'vote_average.gte' || title === 'vote_average.lte' ? (
                // Hvis titlen er 'vote_average.gte' eller 'vote_average.lte', vis en nummer input
                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={vote}
                    onChange={(e) => setVote(e.target.value)}
                    onBlur={handleApplyRange}
                />
            ) : (
                // Hvis ingen af de ovenstående betingelser er opfyldt, vis en tekst input
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={handleApplyRange}
                />
            )}
        </div>
    );
}