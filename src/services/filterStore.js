import {create} from "zustand";

const useFilterStore = create((set) => ({
    filters: {
        sort_by: [],
        with_genres: [],
        without_genres: [],
        'primary_release_date.gte': [],
        'primary_release_date.lte': [],
        "first_air_date.gte": [],
        "first_air_date.lte": [],
        'vote_average.lte': [],
        'vote_average.gte': [],
        with_text_query: [],

        /*
        include_adult: false,
        sort_by: 'popularity.desc',
        with_genres: [],
        with_watch_providers: [],
        without_genres: [],
        primary_release_date_gte: '',
        primary_release_date_lte: '',
        vote_average_gte: '',
        vote_average_lte: '',
        with_text_query: '',
        first_air_date_gte: '',
        first_air_date_lte: '',
        */

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
                sort_by: [],
                with_genres: [],
                without_genres: [],
                'primary_release_date.gte': [],
                'primary_release_date.lte': [],
                'first_air_date.gte': [],
                'first_air_date.lte': [],
                'vote_average.lte': [],
                'vote_average.gte': [],
                with_text_query: [],
            }
        })
    }
}));

export {useFilterStore};