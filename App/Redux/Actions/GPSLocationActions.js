import { createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  getGpsLocation: null,
  gpsLocationSuccess: ["gpsResult"],
  gpsLocationFail: ["gpsError"]
});

export const GPSLocationTypes = Types;
export default Creators;
