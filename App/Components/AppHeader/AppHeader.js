import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

import { Text } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

export default class AppHeader extends Component {
  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: 80,
          alignContent: 'center',
          justifyContent: 'flex-end',
        }}
        source={{ uri: 'https://www.metaweather.com/static/img/weather/png/s.png' }}
      >
        <Text
          h2
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: 200,
          }}
        >
          RN Weather
        </Text>
      </ImageBackground>
    );
  }
}
