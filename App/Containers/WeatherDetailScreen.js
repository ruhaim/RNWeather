import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import LocationSearchComponent from '../../App/Components/LocationSearch/LocationSearchComponent';
import styles from './Styles/LaunchScreenStyles';

export default class WeatherDetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Weather Detail</Text>
      </View>
    );
  }
}
