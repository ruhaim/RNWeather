import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityWeatherActions from '../Redux/Actions/CityWeatherActions';
import styles from './Styles/LaunchScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ForecastComponent from '../Components/ForecastComponents/ForecastComponent';

class WeatherDetailScreen extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      cityWeather: { ...nextProps.cityWeather },
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      cityWeather: {
        isFetching: true,
        apiWeatherResult: { consolidated_weather: [] },
      },
    };
  }
  componentDidMount() {
    const { item } = this.props.navigation.state.params.item;
    this.props.getWeatherByWoeid(item);
  }
  renderForcastComponent() {
    const { apiWeatherResult } = this.state.cityWeather;
    if (apiWeatherResult) {
      return <ForecastComponent weatherResult={apiWeatherResult} />;
    }
    return false;
  }
  render() {
    const { item: city } = this.props.navigation.state.params.item;
    const { isFetching } = this.state.cityWeather;
    return (
      <ScrollView style={styles.container}>
        <Text h2>{city.title} Weather</Text>
        {isFetching ? <ActivityIndicator size="large" /> : null}
        {this.renderForcastComponent()}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  cityWeather: state.cityWeather,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWeatherByWoeid: CityWeatherActions.getWeatherByWoeid,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetailScreen);
