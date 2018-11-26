import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      { enableHighAccuracy: true, timeout: 0, maximumAge: 0, distanceFilter: 0 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  stopPosition = () =>{
   navigator.geolocation.clearWatch(this.watchId);
   navigator.geolocation.stopObserving();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayLocation}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text style={styles.errorMessage}>Error: {this.state.error}</Text> : null}
        </View>
        <View>
        <Button onPress={this.stopPosition} title='Stop'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
     flexGrow: 1,
     alignItems: 'center',
     justifyContent: 'center'
  },
  errorMessage: {
     fontSize: 30,
     color: 'red'
  },
  displayLocation: {
    height: 250
  }
});