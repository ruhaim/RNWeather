import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

export default class GPSLocatorButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      result: null,
      error: null,
      isLocating: false,
    };
  }

  onRequestLocationSuccess = (position) => {
    this.setState({
      ...this.state,
      error: null,
      result: position,
      isLocating: false,
    });
    if (this.props.onLocationReceived) {
      this.props.onLocationReceived(position);
    }
  };
  onRequestLocationFailure = (error) => {
    this.setState({
      ...this.state,
      error,
      result: null,
      isLocating: false,
    });
  };

  requestLocation = () => {
    this.setState({
      ...this.state,
      error: null,
      result: null,
      isLocating: true,
    });

    navigator.geolocation.getCurrentPosition(
      this.onRequestLocationSuccess,
      this.onRequestLocationFailure,
      { enableHighAccuracy: true, timeout: 20000 },
    );
  };

  renderErrorText = () => {
    if (this.state.error) {
      let { message, code } = this.state.error;
      let errorString = `${message} (Code : ${code}), 
      Check your settings and try again`;
      return <Text>{errorString}</Text>;
    }
    return null;
  };

  render() {
    return (
      <View
        style={{ alignItems: 'center', paddingTop: 10, paddingHorizontal: 10 }}
      >
        <Text>Or</Text>
        <Button
          disabled={this.state.isLocating}
          onPress={this.requestLocation}
          icon={{ name: 'md-locate', type: 'ionicon' }}
          title="Determine cities near you (Requires GPS)"
        />
        {this.state.isLocating ? (
          <Text>Hold on tight, We are fetching Location...</Text>
        ) : null}
        {this.renderErrorText()}
      </View>
    );
  }
}
