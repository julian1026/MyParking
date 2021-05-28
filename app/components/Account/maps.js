import React, { Component } from 'react'
import { StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';


let arrayParking = [
  {
    "altitude": "",
    "availableBikes": 7,
    "availableDocks": 32,
    "city": "",
    "id": 72,
    "landMark": "",
    "lastCommunicationTime": "2016-01-22 04:30:15 PM",
    "latitude": 2.442787,
    "location": "",
    "longitude": -76.604576,
    "postalCode": "",
    "stAddress1": "W 52 St & 11 Ave",
    "stAddress2": "",
    "stationName": "parqueadero 1 ",
    "statusKey": 1,
    "statusValue": "en servicio",
    "testStation": false,
    "totalDocks": 39,
  },
  {
    "altitude": "",
    "availableBikes": 33,
    "availableDocks": 0,
    "city": "",
    "id": 79,
    "landMark": "",
    "lastCommunicationTime": "2016-01-22 04:32:41 PM",
    "latitude": 2.4406,
    "location": "",
    "longitude": -76.60934,
    "postalCode": "",
    "stAddress1": "Franklin St & W Broadway",
    "stAddress2": "",
    "stationName": "parqueadero 2",
    "statusKey": 1,
    "statusValue": "en servicio",
    "testStation": false,
    "totalDocks": 33,
  },
  {
    "altitude": "",
    "availableBikes": 0,
    "availableDocks": 27,
    "city": "",
    "id": 82,
    "landMark": "",
    "lastCommunicationTime": "2016-01-22 04:29:41 PM",
    "latitude": 2.438521,
    "location": "",
    "longitude": -76.606153,
    "postalCode": "",
    "stAddress1": "St James Pl & Pearl St",
    "stAddress2": "",
    "stationName": "parqueadero 3",
    "statusKey": 1,
    "statusValue": "en servicio",
    "testStation": false,
    "totalDocks": 27,
  }
]

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
    this.arreglo = arrayParking;
    this.carga = false;
  }


  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.stationBeanList);
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchMarkerData();
  }


  componentDidMount() {
    this.fetchMarkerData();
  }




  render() {

    console.log(this.arreglo);
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 2.4412507,
          longitude: -76.6152077,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.carga ? null : this.arreglo.map((arreglos, index) => {
          const coords = {
            latitude: arreglos.latitude,
            longitude: arreglos.longitude,
          };

          const metadata = `Status: ${arreglos.statusValue}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={arreglos.stationName}
              description={metadata}
            />
          );
        })}
      </MapView>

    );



  }

}
export default Maps;

