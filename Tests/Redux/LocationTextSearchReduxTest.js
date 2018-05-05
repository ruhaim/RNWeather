import Actions from '../../App/Redux/Actions/LocationTextSearchActions';
import { reducer, INITIAL_STATE } from '../../App/Redux/Reducers/LocationTextSearchReducers';

test('request', () => {
  const searchText = 'lon';
  const state = reducer(INITIAL_STATE, Actions.searchLocationRequest(searchText));

  expect(state.isFetching).toBe(true);
  expect(state.searchText).toEqual(searchText);
  expect(state.result).toEqual(require('../../App/Fixtures/searchResultLatLong.json'));
});

test('success', () => {
  const locationSearchResults = [{ woeid: 43534 }, { woeid: 353534 }];
  const state = reducer(INITIAL_STATE, Actions.searchLocationSucess(locationSearchResults));

  expect(state.isFetching).toBe(false);
  expect(state.result).toEqual(locationSearchResults);
  expect(state.error).toBeNull();
});

test('failure', () => {
  const err_obj = { code: 403, message: 'kk' };
  const state = reducer(INITIAL_STATE, Actions.searchLocationFail(err_obj));

  expect(state.isFetching).toBe(false);
  expect(state.error).toEqual(err_obj);
});
