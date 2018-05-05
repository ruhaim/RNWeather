import Actions from '../../App/Redux/Actions/CityWeatherActions';
import {
  reducer,
  INITIAL_STATE,
} from '../../App/Redux/Reducers/CityWeatherReducers';

test('request', () => {
  const selectedCity = { woeid: 1132447, title: 'Busan' };
  const state = reducer(INITIAL_STATE, Actions.getWeatherByWoeid(selectedCity));

  expect(state.isFetching).toBe(true);
  expect(state.selectedCity).toEqual(selectedCity);
  expect(state.apiWeatherResult).toBeNull();
});

test('success', () => {
  const result = { consolidated_weather: [], time: '', woeid: 1132447 };
  const state = reducer(
    INITIAL_STATE,
    Actions.getWeatherByWoeidSuccess(result),
  );

  expect(state.isFetching).toBe(false);
  expect(state.apiWeatherResult).toEqual(result);
  expect(state.apiWeatherError).toBeNull();
});

test('failure', () => {
  const err_obj = { code: 403, message: 'kk' };
  const state = reducer(INITIAL_STATE, Actions.getWeatherByWoeidFail(err_obj));

  expect(state.isFetching).toBe(false);
  expect(state.apiWeatherError).toEqual(err_obj);
});
