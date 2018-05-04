import { call, put } from "redux-saga/effects";
import { path } from "ramda";

import LocationTextSearchActions from "../Redux/Actions/LocationTextSearchActions";

export function* getLocationResultForTextSearch(api, action) {
  const { searchText } = action;
  const apiResult = yield call(api.getSearchResultForString, searchText);
  console.log("apiResult", apiResult);
  if (!apiResult.ok) {
    let { problem, status } = apiResult;
    yield put(
      LocationTextSearchActions.searchLocationFail({
        error: { problem, status }
      })
    );
  }
  yield put(LocationTextSearchActions.searchLocationSucess(apiResult.data));
}
