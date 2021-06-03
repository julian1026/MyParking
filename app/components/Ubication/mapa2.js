import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from 'lodash';
import MapView from 'react-native-maps';

import Modal from '../modal';


export default function Mapa2(props) {
  const { parqueaderos, isLoading } = props;



  // console.log(parqueaderos);

  return (
    <MapView

      style={{ flex: 2 }}
      region={{
        latitude: 2.4412507,
        longitude: -76.6052077,
        latitudeDelta: 0.0100,
        longitudeDelta: 0.0100,
      }}>
      {isLoading ? null : parqueaderos.map((marker, index) => {
        const coords = {
          latitude: marker.locacion.latitude,
          longitude: marker.locacion.longitude,
        };

        const metadata = `Direccion: ${marker.direccion}`;

        return (
          <MapView.Marker
            key={index}
            coordinate={coords}
            title={marker.nombre}
            description={metadata}
          />
        );
      })}


    </MapView>


  );
}

// latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,