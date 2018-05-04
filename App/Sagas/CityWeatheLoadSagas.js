import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import CityWeatherActions from '../Redux/Actions/CityWeatherActions';

export function* getCityWeatherForWoeid(api, action) {
  const { woeid } = action.woeid.item;
  console.log('action', action);
  const apiResult = yield call(api.getWeatherResultForWoeid, woeid);
  console.log('apiResult', apiResult);
  if (!apiResult.ok) {
    let { problem, status } = apiResult;
    yield put(CityWeatherActions.getWeatherByWoeidFail({ error: { problem, status } }));
  }
  yield put(CityWeatherActions.getWeatherByWoeidSuccess(apiResult.data));
}
