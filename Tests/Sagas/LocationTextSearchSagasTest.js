import FixtureWeatherApi from '../../App/Services/FixtureWeatherApi';
import { put, call } from 'redux-saga/effects';
import { getLocationResultForTextSearch } from '../../App/Sagas/LocationTextSearchSagas';
import LocationTextSearchActions from '../../App/Redux/Actions/LocationTextSearchActions';
import { path } from 'ramda';

const stepper = fn => mock => fn.next(mock).value;

test('first calls API', () => {
  const step = stepper(getLocationResultForTextSearch(FixtureWeatherApi, { searchText: 'lon' }));
  // first yield is API
  expect(step()).toEqual(call(FixtureWeatherApi.getSearchResultForString, 'lon'));
});

test('success path', () => {
  const response = FixtureWeatherApi.getSearchResultForString('lon');
  const step = stepper(getLocationResultForTextSearch(FixtureWeatherApi, 'lon'));
  // first step API
  step();
  // Second step successful return
  const stepResponse = step(response);
  // Get the avatar Url from the response
  // const firstUser = path(['data', 'items'], response)[0];
  const { data } = response;
  expect(stepResponse).toEqual(put(LocationTextSearchActions.searchLocationSucess(data)));
});

test('failure path', () => {
  const response = { ok: false };
  const step = stepper(getLocationResultForTextSearch(FixtureWeatherApi, 'lon'));
  // first step API
  step();
  // Second step failed response
  let { problem, status } = response;
  expect(step(response)).toEqual(put(LocationTextSearchActions.searchLocationFail({
    error: { problem, status },
  })));
});
