import React from 'react';
import {useState,useEffect} from "react"
import {StyleSheet,Text,View } from "react-native";
import MapView from 'react-native-maps';



export default function  Mapa2(){
    const [isLoading, setIsLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
   
    useEffect(() => {
      fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.stationBeanList);
        setIsLoading(false);
        setMarkers(responseJson.stationBeanList)
      })
      .catch((error) => {
        console.log(error);
      });

    }, []);


    markers.map((w)=>console.log(w))
    // useEffect(() => {
    //   fetch('http://192.168.18.3/agropecuaria/public/api/v1/fincas')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json))
    //     .catch((error) => console.error(error))
    // }, []);


    return(
      
       <MapView
          style={{ flex: 2 }}
          region={{
            latitude: 40.76727216,
            longitude: -73.99392888,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        {isLoading ? null : markers.map((marker, index) => {
          const coords = {
              latitude: marker.latitude,
              longitude: marker.longitude,
          };
      
          const metadata = `Status: ${marker.statusValue}`;
      
          return (
              <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.stationName}
                  description={metadata}
              />
          );
        })}

      
      </MapView>
    
 
    );
}

