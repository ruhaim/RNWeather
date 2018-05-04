import { call, put } from "redux-saga/effects";
import { path } from "ramda";
import GPSLocationActions from "../Redux/Actions/GPSLocationActions";
import LocationCoordSearchActions from "../Redux/Actions/LocationCoordSearchActions";

function userPositionPromised() {
  const position = {};

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      result => position.on({ result }),
      error => position.on({ error }),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }
  return {
    getLocation: () =>
      new Promise((location, reject) => {
        position.on = location;
      })
  };
}

export function* getGPSLocation() {
  const { getLocation } = yield call(userPositionPromised);
  const { error, result } = yield call(getLocation);
  if (error) {
    yield put(GPSLocationActions.gpsLocationFail(error));
    return null;
  }
  yield put(GPSLocationActions.gpsLocationSuccess(result));
  return result;
}

export function* getLocationResultForGPSLocation(action) {
  let location = yield call(getGPSLocation);
  console.log("location", location);
  if (!location) {
    yield put(
      LocationCoordSearchActions.searchCoordLocationFail({ error: "GPS Error" })
    );
    return;
  }
  yield put(
    LocationCoordSearchActions.searchCoordLocationRequest(location.coords)
  );
}

export function* searchCoordLocationRequest(api, action) {
  const { latitude, longitude } = action.coords;
  console.log("action", action);
  const apiResult = yield call(
    api.getSearchResultForLattLong,
    latitude,
    longitude
  );
  console.log("apiResult", apiResult);
  if (!apiResult.ok) {
    let { problem, status } = apiResult;
    yield put(
      LocationCoordSearchActions.searchCoordLocationFail({
        error: { problem, status }
      })
    );
  }
  yield put(
    LocationCoordSearchActions.searchCoordLocationSucess(apiResult.data)
  );
}
