/* eslint no-unused-vars: "off" */
export default {
  // Functions return fixtures
  getSearchResultForString: searchString => ({
    ok: true,
    data: require('../Fixtures/searchResultString.json'),
  }),
  getSearchResultForLattLong: (lat, long) => ({
    ok: true,
    data: require('../Fixtures/searchResultLatLong.json'),
  }),
  getWeatherResultForWoeid: woeid => ({
    ok: true,
    data: require('../Fixtures/woeidResult.json'),
  }),
};
