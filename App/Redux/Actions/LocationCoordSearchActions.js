import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  searchNearbyLocationsWithGps: null,
  searchCoordLocationRequest: ["coords"],
  searchCoordLocationSucess: ["locationSearchResults"],
  searchCoordLocationFail: ["locationSearchError"]
});

export const LocationCoordSearchTypes = Types;
export default Creators;
