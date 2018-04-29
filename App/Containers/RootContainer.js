import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxNavigation from '../Navigation/ReduxNavigation';

// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup();
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
