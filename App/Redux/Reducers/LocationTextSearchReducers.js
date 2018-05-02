import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { LocationTextSearchTypes } from '../Actions/LocationTextSearchActions';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  searchText: null,
  result: null,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { searchText }) =>
  state.merge({ fetching: true, searchText });

// successful avatar lookup
export const success = (state, { locationSearchResults }) =>
  state.merge({ fetching: false, error: null, result: locationSearchResults });

// failed to get the avatar
export const failure = (state, { locationSearchError }) =>
  state.merge({ fetching: false, error: locationSearchError });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [LocationTextSearchTypes.SEARCH_LOCATION_REQUEST]: request,
  [LocationTextSearchTypes.SEARCH_LOCATION_SUCESS]: success,
  [LocationTextSearchTypes.SEARCH_LOCATION_FAIL]: failure,
});
