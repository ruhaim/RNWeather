import Actions from '../../App/Redux/Actions/GPSLocationActions';
import { reducer, INITIAL_STATE } from '../../App/Redux/Reducers/GPSLocationReducers';

test('request', () => {
  const state = reducer(INITIAL_STATE, Actions.getGpsLocation());

  expect(state.isFetching).toBe(true);
  expect(state.gpsResult).toBeNull();
});

test('success', () => {
  const gpsResult = { lattitue: '12.99', longitude: '334.55' };
  const state = reducer(INITIAL_STATE, Actions.gpsLocationSuccess(gpsResult));

  expect(state.isFetching).toBe(false);
  expect(state.gpsResult).toEqual(gpsResult);
  expect(state.gpsError).toBeNull();
});

test('failure', () => {
  const err_obj = { code: 403, message: 'kk' };
  const state = reducer(INITIAL_STATE, Actions.gpsLocationFail(err_obj));

  expect(state.isFetching).toBe(false);
  expect(state.gpsError).toEqual(err_obj);
});
