import WeatherApi from '../../App/Services/WeatherApi';
import FixtureWeatherApi from '../../App/Services/FixtureWeatherApi';
import R from 'ramda';

test('All fixtures map to actual API', () => {
  const fixtureKeys = R.keys(FixtureWeatherApi).sort();
  const apiKeys = R.keys(WeatherApi.create());

  const intersection = R.intersection(fixtureKeys, apiKeys).sort();

  // There is no difference between the intersection and all fixtures
  expect(R.equals(fixtureKeys, intersection)).toBe(true);
});

test('FixtureAPI getSearchResultForLattLong returns the right file', () => {
  const expectedFile = require('../../App/Fixtures/searchResultLatLong.json');

  expect(FixtureWeatherApi.getSearchResultForLattLong(3, 4)).toEqual({
    ok: true,
    data: expectedFile,
  });
});

test('FixtureAPI searchResultString', () => {
  const expectedFile = require('../../App/Fixtures/searchResultString.json');

  expect(FixtureWeatherApi.getSearchResultForString('gtf')).toEqual({
    ok: true,
    data: expectedFile,
  });
});

test('FixtureAPI getWeatherResultForWoeid', () => {
  const expectedFile = require('../../App/Fixtures/woeidResult.json');

  expect(FixtureWeatherApi.getWeatherResultForWoeid(234)).toEqual({
    ok: true,
    data: expectedFile,
  });
});
