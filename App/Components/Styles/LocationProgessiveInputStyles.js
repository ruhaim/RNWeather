import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  listViewContainer: {
    flex: 0,
  },
  listView: {
    backgroundColor: 'white',
    margin: 10,
  },
  listItem: {
    padding: 10,
  },
  listItemSeparator: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
});
