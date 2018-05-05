import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ForecastComponent extends Component {
  static defaultProps = { show: true };

  render() {
    const { weatherResult } = this.props;
    console.log('weatherResult', weatherResult);
    const {
      consolidated_weather, title, sun_rise, sun_set,
    } = weatherResult;
    const [weatherToday, weatherNextFewDays] = consolidated_weather;
    //
    const {
      applicable_date,
      max_temp,
      min_temp,
      the_temp,
      weather_state_abbr,
      weather_state_name,
      wind_direction,
      wind_speed,
    } = weatherToday;
    const messageComponent = null;
    if (this.props.show) {
      return (
        <View>
          <Card
            title={`Today (${applicable_date})`}
            image={{
              uri: `https://www.metaweather.com/static/img/weather/png/64/${weather_state_abbr}.png`,
            }}
            imageProps={{ resizeMode: 'contain' }}
          >
            <View style={{ flexDirection: 'row', paddingRight: 4 }}>
              <View style={{ flexDirection: 'row', paddingRight: 4 }}>
                <Icon name="ios-thermometer-outline" size={50} />
                <View>
                  <Text>Max: {max_temp}°C</Text>
                  <Text>Avg: {the_temp}°C</Text>
                  <Text>Min: {min_temp}°C</Text>
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
                  <Text>{wind_speed} kmph </Text>
                </View>
              </View>
            </View>

            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component structure than actual
              design.
            </Text>

            <Button
              icon={{ name: 'code' }}
              backgroundColor="#03A9F4"
              fontFamily="Lato"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW FORECAST"
            />
          </Card>
        </View>
      );
    }

    return messageComponent;
  }
}
