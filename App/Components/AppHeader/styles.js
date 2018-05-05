import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 80,
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    ...Fonts.style.h3,
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 200,
  },
});
