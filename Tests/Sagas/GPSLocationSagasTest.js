import FixtureWeatherApi from '../../App/Services/FixtureWeatherApi';
import { put, call } from 'redux-saga/effects';
import { searchCoordLocationRequest } from '../../App/Sagas/GPSLocationSagas';
import GPSLocationActions from '../../App/Redux/Actions/GPSLocationActions';
import LocationCoordSearchActions from '../../App/Redux/Actions/LocationCoordSearchActions';
import { path } from 'ramda';

const stepper = fn => mock => fn.next(mock).value;

test('first calls API', () => {
  const step = stepper(searchCoordLocationRequest(FixtureWeatherApi, { coords: { latitude: '2', longitude: '3' } }));
  // first yield is API
  expect(step()).toEqual(call(FixtureWeatherApi.getSearchResultForLattLong, '2', '3'));
});

test('success path', () => {
  const response = FixtureWeatherApi.getSearchResultForLattLong(2, 3);
  const step = stepper(searchCoordLocationRequest(FixtureWeatherApi, { coords: { latitude: 2, longitude: 3 } }));
  // first step API
  step();
  // Second step successful return
  const stepResponse = step(response);
  // Get the avatar Url from the response
  // const firstUser = path(['data', 'items'], response)[0];
  const { data } = response;
  expect(stepResponse).toEqual(put(LocationCoordSearchActions.searchCoordLocationSucess(data)));
});

test('failure path', () => {
  const response = { ok: false };
  const step = stepper(searchCoordLocationRequest(FixtureWeatherApi, { coords: { latitude: 2, longitude: 3 } }));
  // first step API
  step();
  // Second step failed response
  let { problem, status } = response;
  expect(step(response)).toEqual(put(LocationCoordSearchActions.searchCoordLocationFail({ error: { problem, status } })));
});
