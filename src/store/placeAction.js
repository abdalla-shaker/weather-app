import { searchSliceActions } from "./userSearch.js";

export const placeFetch = (place) => {
  return async (dispatch) => {
    const fetchPlace = async () => {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${place
          .split(" ")
          .join("+")
          .split(",")
          .join("%2C")}&key=e31ee6dcf310450289c784bdfe32f874`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to get the location information please try to enter a valid location"
        );
      }

      const data = await res.json();

      return data;
    };

    try {
      const placeInfo = await fetchPlace();
      dispatch(searchSliceActions.searchInput({ info: placeInfo, place }));
    } catch (err) {
      const errorType = err;
      dispatch(searchSliceActions.searchError(errorType));
    }
  };
};
