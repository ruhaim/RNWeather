import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

import { Text } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class AppHeader extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.imageContainer}
        source={{
          uri: 'https://www.metaweather.com/static/img/weather/png/s.png',
        }}
      >
        <Text h2 style={styles.headerText}>
          RN Weather
        </Text>
      </ImageBackground>
    );
  }
}
