import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  searchLocationRequest: ['searchText'],
  searchLocationSucess: ['locationSearchResults'],
  searchLocationFail: ['locationSearchError'],
});

export const LocationTextSearchTypes = Types;
export default Creators;
