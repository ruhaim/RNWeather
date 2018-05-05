import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ForecastDayItem extends Component {
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
      <ListItem
        key={applicable_date}
        hideChevron
        title={applicable_date}
        rightTitle={`${String(the_temp).substr(0, 4)}°C`}
        avatar={{
          uri: `https://www.metaweather.com/static/img/weather/png/64/${weather_state_abbr}.png`,
        }}
      />
    );
  }
}
