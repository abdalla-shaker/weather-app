import { createSlice } from "@reduxjs/toolkit";

const places = localStorage.getItem("place")
  ? JSON.parse(localStorage.getItem("place"))
  : [];

const searchInitialState = {
  searchedPlaces: places,
  placeDetails: {},
  errorStatus: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    searchInput(state, action) {
      const data = action.payload;

      if (
        data.info &&
        data.info.results &&
        data.info.results[0] &&
        data.info.results[0].annotations &&
        data.info.results[0].annotations.DMS
      ) {
        const searchedPlaceInfo = {
          lat: data.info.results[0].annotations.DMS.lat.slice(0, 2),
          lon:
            data.info.results[0].annotations.DMS.lng.match(/-?\d{1,3}/)?.[0] ||
            "",
        };

        const newSearchPlaces = [data.place, ...state.searchedPlaces];

        const filteredPlaces = newSearchPlaces.filter((_, index) => index < 3);

        localStorage.setItem("place", JSON.stringify(filteredPlaces));

        return {
          ...state,
          searchedPlaces: filteredPlaces,
          placeDetails: searchedPlaceInfo,
        };
      } else {
        return {
          ...state,
          errorStatus: {
            status: true,
            type: action.payload,
            message: "Please enter a valid place name",
          },
        };
      }
    },
    searchError(state, action) {
      return {
        ...state,
        errorStatus: {
          status: true,
          type: action.payload,
          message: "Please enter a valid place name",
        },
      };
    },
  },
});

export const searchSliceActions = searchSlice.actions;
export default searchSlice.reducer;
