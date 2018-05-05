import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ForecastComponent extends Component {
  static defaultProps = { show: true };

  render() {
    const {
      applicable_date,
      max_temp,
      min_temp,
      the_temp,
      weather_state_abbr,
      weather_state_name,
      wind_direction,
      wind_speed,
    } = this.props.data;
    const messageComponent = null;

    return (
      <Card
        title={`Today (${applicable_date}) - ${weather_state_name}`}
        image={{
          uri: `https://www.metaweather.com/static/img/weather/png/64/${weather_state_abbr}.png`,
        }}
        imageProps={{ resizeMode: 'contain' }}
      >
        <View style={{ flexDirection: 'row', paddingRight: 4 }}>
          <View style={{ flexDirection: 'row', paddingRight: 4 }}>
            <Icon name="ios-thermometer-outline" size={50} />
            <View>
              <Text>Max: {String(max_temp).substr(0, 4)}°C</Text>
              <Text>Avg: {String(the_temp).substr(0, 4)}°C</Text>
              <Text>Min: {String(min_temp).substr(0, 4)}°C</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingRight: 4 }}>
            <Icon
              style={{
                transform: [
                  {
                    rotate: `${wind_direction}deg`,
                  },
                ],
              }}
              name="md-arrow-round-up"
              size={50}
            />
            <View>
              <Text>Wind Speed </Text>
              <Text>{String(wind_speed).substr(0, 4)} kmph </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
