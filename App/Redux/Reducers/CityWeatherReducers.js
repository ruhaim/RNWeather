import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { CityWeatherTypes } from "../Actions/CityWeatherActions";

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  selectedCity: null,
  loadedCitites: [],
  apiWeatherResult: null,
  apiWeatherError: null,
  isFetching: false
});

/* ------------- Reducers ------------- */

export const request = state => state.merge({ isFetching: true });

export const success = (state, { result }) =>
  state.merge({
    isFetching: false,
    apiWeatherError: null,
    apiWeatherResult: result
  });

export const failure = (state, { error }) =>
  state.merge({ isFetching: false, apiWeatherError: error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [CityWeatherTypes.GET_WEATHER_BY_WOEID]: request,
  [CityWeatherTypes.GET_WEATHER_BY_WOEID_SUCCESS]: success,
  [CityWeatherTypes.GET_WEATHER_BY_WOEID_FAIL]: failure
});
