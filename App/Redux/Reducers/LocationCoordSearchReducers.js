import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { LocationCoordSearchTypes } from "../Actions/LocationCoordSearchActions";

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  coords: null,
  result: null,
  error: null,
  isFetching: false
});

/* ------------- Reducers ------------- */

export const request = (state, { coords }) =>
  state.merge({ isFetching: true, coords });
export const gpsRequest = state => state.merge({ isFetching: true });

export const success = (state, { locationSearchResults }) =>
  state.merge({
    isFetching: false,
    error: null,
    result: locationSearchResults
  });

export const failure = (state, { locationSearchError }) =>
  state.merge({ isFetching: false, error: locationSearchError });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [LocationCoordSearchTypes.SEARCH_NEARBY_LOCATIONS_WITH_GPS]: gpsRequest,
  [LocationCoordSearchTypes.SEARCH_COORD_LOCATION_REQUEST]: request,
  [LocationCoordSearchTypes.SEARCH_COORD_LOCATION_SUCESS]: success,
  [LocationCoordSearchTypes.SEARCH_COORD_LOCATION_FAIL]: failure
});
