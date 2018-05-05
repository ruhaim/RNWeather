import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  messages: {
    alignSelf: 'center',
    flexDirection: 'row',
  },

  errorMessage: {
    fontWeight: 'bold',
  },
  listContainerStyle: {
    borderTopWidth: 0,
    paddingTop: 0,
    marginTop: -100,
    maxHeight: '70%',
    backgroundColor: 'transparent',
  },
  gpsComponentSearchStyle: {
    borderTopWidth: 0,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
});
