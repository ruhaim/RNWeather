import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class GPSLocatorButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Or</Text>
        <Button
          disabled={this.state.isLoading}
          onPress={this.props.onPress}
          icon={{ name: 'md-locate', type: 'ionicon' }}
          title="Determine cities near you (Requires GPS)"
        />
      </View>
    );
  }
}
