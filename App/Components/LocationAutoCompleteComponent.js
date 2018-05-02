import React, { Component } from 'react';
import ProgressiveInput from './ProgressiveInput';
import { View, ListView, TouchableOpacity, Text } from 'react-native';
import styles from './Styles/LocationAutoCompleteComponentStyles';

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
      <TouchableOpacity onPress={() => this.onListItemClicked(prediction)} style={styles.listItem}>
        <Text>{prediction.description}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.listItemSeparator} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressiveInput
          value={this.state.value}
          style={styles.progressiveInput}
          isLoading={this.state.isLoading}
          onChangeText={this.searchLocation}
          onInputCleared={this.onInputCleared}
        />
        <View style={styles.listViewContainer}>
          <ListView
            enableEmptySections
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
          />
        </View>
      </View>
    );
  }
}
