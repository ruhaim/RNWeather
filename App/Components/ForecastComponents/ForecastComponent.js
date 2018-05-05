import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ForecastDayItem from './ForecastDayItem';
import ForecastTodayItem from './ForecastTodayItem';
import styles from './styles';

export default class ForecastComponent extends Component {
  static defaultProps = { show: true };

  render() {
    const { weatherResult } = this.props;
    const {
      consolidated_weather, title, sun_rise, sun_set,
    } = weatherResult;
    const [weatherToday, ...weatherNextFewDays] = consolidated_weather;

    const messageComponent = null;
    if (this.props.show) {
      return (
        <View style={styles.container}>
          <ForecastTodayItem data={weatherToday} />
          <Card containerStyle={{ padding: 0 }}>
            {weatherNextFewDays.map((u, i) => (
              <ForecastDayItem data={u} key={u.applicable_date} />
            ))}
          </Card>
        </View>
      );
    }

    return messageComponent;
  }
}
