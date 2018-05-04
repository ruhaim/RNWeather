import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';
import GPSLocatorButton from './GPSLocatorButton/GPSLocatorButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GPSLocationActions from '../../Redux/Actions/GPSLocationActions';
import LocationCoordSearchActions from '../../Redux/Actions/LocationCoordSearchActions';

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

  renderRow = (item, searchText) => (
    <ListItem
      title={
        <Highlighter
          style={{ paddingLeft: 5 }}
          highlightStyle={{ fontWeight: 'bold' }}
          searchWords={[searchText]}
          textToHighlight={item.item.title}
        />
      }
      avatar={<Icon name="md-pin" size={25} />}
    />
  );
  renderFetchingMessage = () => (
    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
      <ActivityIndicator size="small" />
      <Text>Fetching cities nearby...</Text>
    </View>
  );
  renderFetchErrorMessage = () => {
    console.log(this.props);
    let errorString;
    if (this.props.gpsLocation.gpsError) {
      let { message, code } = this.props.gpsLocation.gpsError;
      errorString = `${message} (Code : ${code}), \nCheck your location settings and try again`;
    } else {
      errorString =
        'Error fetching nearby cities, check your network connection and try again';
    }
    return (
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}
      >
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
            this.props.searchNearbyLocationsWithGps();
          }}
        />
        {isFetching ? this.renderFetchingMessage() : null}
        <List
          containerStyle={{
            maxHeight: '75%',
            borderTopWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            data={result}
            renderItem={item => this.renderRow(item, '')}
            keyExtractor={item => String(item.woeid)}
          />
        </List>

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
      searchNearbyLocationsWithGps:
        LocationCoordSearchActions.searchNearbyLocationsWithGps,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(GPSLocationSearchComponent);
