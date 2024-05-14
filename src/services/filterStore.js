import {create} from "zustand";

const useFilterStore = create((set) => ({
    filters: {
        ReleaseDate: [],
        SortBy: [],
        VoteAverage: [],
        Genres: [],
        WatchProviders: [],
        TextQuery: [],
    },

    addFilter: (filterName, newValue) => {
        if (!useFilterStore.getState().filters[filterName]) {
            console.error("invalid filter")
            return;
        }

        if (useFilterStore.getState().filters[filterName].includes(newValue)) {
            console.error("Filter already exists");
            return;
        }

        set((state) => ({
            filters: {
                ...state.filters,
                [filterName]: [...state.filters[filterName], newValue]
            }
        }));
    },

    removeFilter: (filterName, valueToRemove) => {
        if (!useFilterStore.getState().filters[filterName]) {
            console.error("invalid filter")
            return;
        }

        if (!useFilterStore.getState().filters[filterName].includes(valueToRemove)) {
            console.error("Filter doesn't exist");
            return;
        }

        set((state) => ({
            filters: {
                ...state.filters,
                [filterName]: state.filters[filterName].filter(filter => filter !== valueToRemove)
            }
        }));
    },

    resetFilters: () => {
        set({
            filters: {
                ReleaseDate: [],
                SortBy: [],
                VoteAverage: [],
                Genres: [],
                WatchProviders: [],
                TextQuery: [],
            }
        })
    }
}));

export {useFilterStore};