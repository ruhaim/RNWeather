import FixtureWeatherApi from '../../App/Services/FixtureWeatherApi';
import { put, call } from 'redux-saga/effects';
import { getCityWeatherForWoeid } from '../../App/Sagas/CityWeatheLoadSagas';
import CityWeatherActions from '../../App/Redux/Actions/CityWeatherActions';
import { path } from 'ramda';

const stepper = fn => mock => fn.next(mock).value;

test('first calls API', () => {
  const step = stepper(getCityWeatherForWoeid(FixtureWeatherApi, { selectedCity: { woeid: 3456 } }));
  // first yield is API
  expect(step()).toEqual(call(FixtureWeatherApi.getWeatherResultForWoeid, 3456));
});

test('success path', () => {
  const response = FixtureWeatherApi.getWeatherResultForWoeid(3456);
  const step = stepper(getCityWeatherForWoeid(FixtureWeatherApi, { selectedCity: { woeid: 3456 } }));
  // first step API
  step();
  // Second step successful return
  const stepResponse = step(response);
  // Get the avatar Url from the response
  // const firstUser = path(['data', 'items'], response)[0];
  const { data } = response;
  expect(stepResponse).toEqual(put(CityWeatherActions.getWeatherByWoeidSuccess(data)));
});

test('failure path', () => {
  const response = { ok: false };
  const step = stepper(getCityWeatherForWoeid(FixtureWeatherApi, { selectedCity: { woeid: 3456 } }));
  // first step API
  step();
  // Second step failed response
  let { problem, status } = response;
  expect(step(response)).toEqual(put(CityWeatherActions.getWeatherByWoeidFail({ error: { problem, status } })));
});
