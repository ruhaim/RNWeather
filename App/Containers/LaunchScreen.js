import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LocationSearchComponent from '../../App/Components/LocationSearch/LocationSearchComponent';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View>
        <LocationSearchComponent />
      </View>
    );
  }
}
