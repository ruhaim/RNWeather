import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { GPSLocationTypes } from '../Actions/GPSLocationActions';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  gpsResult: null,
  gpsError: null,
  isFetching: false,
});

/* ------------- Reducers ------------- */

export const request = state => state.merge({ isFetching: true });

export const success = (state, { gpsResult }) =>
  state.merge({ isFetching: false, gpsError: null, gpsResult });

export const failure = (state, { gpsError }) => state.merge({ isFetching: false, gpsError });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [GPSLocationTypes.GET_GPS_LOCATION]: request,
  [GPSLocationTypes.GPS_LOCATION_SUCCESS]: success,
  [GPSLocationTypes.GPS_LOCATION_FAIL]: failure,
});
