import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  progressiveInput: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
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
