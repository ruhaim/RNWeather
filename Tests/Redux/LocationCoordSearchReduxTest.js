import Actions from '../../App/Redux/Actions/LocationCoordSearchActions';
import {
  reducer,
  INITIAL_STATE,
} from '../../App/Redux/Reducers/LocationCoordSearchReducers';

test('gpsRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.searchNearbyLocationsWithGps());

  expect(state.isFetching).toBe(true);
  expect(state.result).toBeNull();
});

test('request', () => {
  const coords = { lattitue: '12.99', longitude: '334.55' };

  const state = reducer(
    INITIAL_STATE,
    Actions.searchCoordLocationRequest(coords),
  );

  expect(state.isFetching).toBe(true);
  expect(state.coords).toEqual(coords);
  expect(state.result).toBeNull();
});

test('success', () => {
  const locationSearchResults = [{ woeid: 43534 }, { woeid: 353534 }];
  const state = reducer(
    INITIAL_STATE,
    Actions.searchCoordLocationSucess(locationSearchResults),
  );

  expect(state.isFetching).toBe(false);
  expect(state.result).toEqual(locationSearchResults);
  expect(state.error).toBeNull();
});

test('failure', () => {
  const err_obj = { code: 403, message: 'kk' };
  const state = reducer(
    INITIAL_STATE,
    Actions.searchCoordLocationFail(err_obj),
  );

  expect(state.isFetching).toBe(false);
  expect(state.error).toEqual(err_obj);
});
