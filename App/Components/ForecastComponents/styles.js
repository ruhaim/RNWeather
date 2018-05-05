import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    marginHorizontal: Metrics.marginHorizontal,
  },
  twoColContainer: {
    flexDirection: 'row',
    paddingRight: 4,
    flex: 1,
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
});
