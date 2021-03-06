import { takeLatest, all, throttle } from 'redux-saga/effects';

import WeatherAPI from '../Services/WeatherApi';

import FixtureWeatherApi from '../Services/FixtureWeatherApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { GPSLocationTypes } from '../Redux/Actions/GPSLocationActions';
import { LocationCoordSearchTypes } from '../Redux/Actions/LocationCoordSearchActions';
import { LocationTextSearchTypes } from '../Redux/Actions/LocationTextSearchActions';
import { CityWeatherTypes } from '../Redux/Actions/CityWeatherActions';

/* ------------- Sagas ------------- */

import { getLocationResultForTextSearch } from './LocationTextSearchSagas';

import { getCityWeatherForWoeid } from './CityWeatheLoadSagas';

import {
  getGPSLocation,
  getLocationResultForGPSLocation,
  searchCoordLocationRequest,
} from './GPSLocationSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const weatherApi = DebugConfig.useFixtures
  ? FixtureWeatherApi
  : WeatherAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(GPSLocationTypes.GET_GPS_LOCATION, getGPSLocation),
    takeLatest(
      LocationCoordSearchTypes.SEARCH_COORD_LOCATION_REQUEST,
      searchCoordLocationRequest,
      weatherApi,
    ),

    takeLatest(
      LocationCoordSearchTypes.SEARCH_NEARBY_LOCATIONS_WITH_GPS,
      getLocationResultForGPSLocation,
      weatherApi,
    ),

    takeLatest(
      CityWeatherTypes.GET_WEATHER_BY_WOEID,
      getCityWeatherForWoeid,
      weatherApi,
    ),

    throttle(
      500,
      LocationTextSearchTypes.SEARCH_LOCATION_REQUEST,
      getLocationResultForTextSearch,
      weatherApi,
    ),
  ]);
}
