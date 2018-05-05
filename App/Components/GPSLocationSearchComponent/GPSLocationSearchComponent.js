import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Text, List, ListItem } from 'react-native-elements';
import GPSLocatorButton from './GPSLocatorButton/GPSLocatorButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LocationCoordSearchActions from '../../Redux/Actions/LocationCoordSearchActions';
import styles from './styles';

class GPSLocationSearchComponent extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      locationCoordSearch: { ...nextProps.locationCoordSearch },
      gpsLocation: { ...nextProps.gpsLocation },
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
    };
  }

  renderFetchingMessage = () => (
    <View style={styles.messages}>
      <ActivityIndicator size="small" />
      <Text>Fetching cities nearby...</Text>
    </View>
  );
  renderFetchErrorMessage = () => {
    let errorString;
    if (this.props.gpsLocation.gpsError) {
      let { message, code } = this.props.gpsLocation.gpsError;
      errorString = `${message} (Code : ${code}), \nCheck your location settings and try again`;
    } else {
      errorString = 'Error fetching nearby cities, check your network connection and try again';
    }
    return (
      <View style={[styles.messages, styles.errorMessage]}>
        <Icon name="md-alert" type="ionicon" size={20} />
        <Text>{errorString}</Text>
      </View>
    );
  };

  render() {
    const { result, isFetching, error } = this.state.locationCoordSearch;

    return (
      <View>
        <GPSLocatorButton
          isLoading={isFetching}
          onPress={() => {
            if (this.props.onSearchInit) {
              this.props.onSearchInit();
            }

            this.props.searchNearbyLocationsWithGps();
          }}
        />
        {isFetching ? this.renderFetchingMessage() : null}
        {error ? this.renderFetchErrorMessage() : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  locationCoordSearch: state.locationCoordSearch,
  gpsLocation: state.gpsLocation,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchNearbyLocationsWithGps: LocationCoordSearchActions.searchNearbyLocationsWithGps,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(GPSLocationSearchComponent));
