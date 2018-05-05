import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LocationSearchComponent from '../../App/Components/LocationSearch/LocationSearchComponent';
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LocationSearchComponent
          gotoWeatherDetailsView={this.gotoWeatherDetailsView}
        />
      </View>
    );
  }
}
