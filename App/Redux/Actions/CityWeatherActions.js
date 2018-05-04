import { createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  getWeatherByWoeid: ["woeid"],
  getWeatherByWoeidSuccess: ["loadWeatherResults"],
  getWeatherByWoeidFail: ["loadWeatherResults"]
});

export const CityWeatherTypes = Types;
export default Creators;
