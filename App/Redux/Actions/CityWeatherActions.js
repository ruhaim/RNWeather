import { createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getWeatherByWoeid: ['selectedCity'],
  getWeatherByWoeidSuccess: ['result'],
  getWeatherByWoeidFail: ['error'],
});

export const CityWeatherTypes = Types;
export default Creators;
