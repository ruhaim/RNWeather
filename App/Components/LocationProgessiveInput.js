import React, { Component } from 'react';
import ProgressiveInput from './ProgressiveInput';
import { View, ListView, TouchableOpacity, Text } from 'react-native';
import styles from './Styles/LocationProgessiveInputStyles';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});

export default class LocationProgessiveInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isLoading: false,
      dataSource: ds.cloneWithRows([]),
    };
  }

  _onChangeText(text) {
    this.setState({ isLoading: true, value: text });

    fetch(`https://www.metaweather.com/api/location/search/?query=${text}`).then((result) => {
      // Process list of suggestions

      this.setState({ isLoading: false, dataSource: ds.cloneWithRows(result) });
    });
  }

  renderRow(prediction) {
    return (
      <TouchableOpacity
        onPress={() => this.onListItemClicked(prediction)}
        style={styles.listItem}
      >
        <Text>{prediction.description}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.listItemSeparator} />;
  }

  render() {
    return (
      <ProgressiveInput
        value={this.state.value}
        isLoading={this.state.isLoading}
        onChangeText={(event) => {
          this._onChangeText(event);
        }}
      />
    );
  }
}
