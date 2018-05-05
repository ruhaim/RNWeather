import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { CityWeatherTypes } from '../Actions/CityWeatherActions';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  selectedCity: null,
  loadedCitites: {},
  apiWeatherResult: null,
  apiWeatherError: null,
  isFetching: false,
});

/* ------------- Reducers ------------- */

export const request = (state, { selectedCity }) =>
  state.merge({ isFetching: true, selectedCity });

export const success = (state, { result }) => {
  const woeidKey = `woeid_${result.woeid}`;
  return state.merge({
    apiWeatherResult: result,
    isFetching: false,
    apiWeatherError: null,
    loadedCitites: Object.assign({}, state.loadedCitites, {
      [woeidKey]: result,
    }),
  });
};

export const failure = (state, { error }) =>
  state.merge({ isFetching: false, apiWeatherError: error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [CityWeatherTypes.GET_WEATHER_BY_WOEID]: request,
  [CityWeatherTypes.GET_WEATHER_BY_WOEID_SUCCESS]: success,
  [CityWeatherTypes.GET_WEATHER_BY_WOEID_FAIL]: failure,
});
