import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { LocationTextSearchTypes } from '../Actions/LocationTextSearchActions';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  searchText: null,
  result: require('../../Fixtures/searchResultLatLong.json'),
  error: null,
  isFetching: false,
});

/* ------------- Reducers ------------- */

export const request = (state, { searchText }) =>
  state.merge({ isFetching: true, searchText });

export const success = (state, { locationSearchResults }) =>
  state.merge({
    isFetching: false,
    error: null,
    result: locationSearchResults,
  });

export const failure = (state, { locationSearchError }) =>
  state.merge({ isFetching: false, error: locationSearchError });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [LocationTextSearchTypes.SEARCH_LOCATION_REQUEST]: request,
  [LocationTextSearchTypes.SEARCH_LOCATION_SUCESS]: success,
  [LocationTextSearchTypes.SEARCH_LOCATION_FAIL]: failure,
});
