import React, { Component } from 'react';

import { ListItem } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

class LocationListItemRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      result: null,
      error: null,
      fetching: false,
    };
  }
  onPress = () => {
    // this.props.getWeatherByWoeid(this.props.item);
    this.props.navigation.navigate('WeatherDetailScreen', {
      item: this.props.item,
    });
  };
  // item, searchText
  render() {
    const { item, searchText } = this.props;
    return (
      <TouchableNativeFeedback onPress={this.props.onPress || this.onPress}>
        <ListItem
          title={
            <Highlighter
              style={{ paddingLeft: 5 }}
              highlightStyle={{ fontWeight: 'bold' }}
              searchWords={[searchText]}
              textToHighlight={item.item.title}
            />
          }
          avatar={<Icon name="md-pin" size={25} />}
        />
      </TouchableNativeFeedback>
    );
  }
}
export default LocationListItemRenderer;
