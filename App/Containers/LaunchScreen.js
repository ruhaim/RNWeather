import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LocationSearchComponent from '../../App/Components/LocationSearch/LocationSearchComponent';
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  gotoWeatherDetailsView = (item) => {
    console.log('item', item);
  };

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
