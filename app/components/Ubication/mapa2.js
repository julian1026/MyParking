import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { Icon, Avatar, Input, Button } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import { size } from 'lodash';
import MapView from 'react-native-maps';
import openMap from "react-native-open-maps";

import Modal from '../modal';
import Loading from '../../components/Loading'


export default function Mapa2(props) {
  const { parqueaderos, isLoading } = props;
  const [isVisibleShow, setIsVisibleShow] = useState(false);
  const [name, setName] = useState('');
  const [coordenadas, setCoordenadas] = useState([]);
  const [descripcion, setDescripcion] = useState(null);
  const [imagenParking, setImagenParking] = useState(null);

  //mapa personalizado
  const customStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];


  //alert sin funcionalida
  const mostrarDatos = (nombre, coordenadas, metadata) => {
    Alert.alert(
      `Parqueadero  ${nombre}`,
      `${metadata}  ${coordenadas.latitude}  y ${coordenadas.longitude}`,

      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Ir a Parqueadero 🗺",
          onPress: () => openAppMap(coordenadas, nombre),
        },
      ],
      { cancelable: false }
    );
  }



  return (
    <View style={{ flex: 1 }}>
      <MapView

        style={{ flex: 2, }}
        region={{
          latitude: 2.4412507,
          longitude: -76.6052077,
          latitudeDelta: 0.0100,
          longitudeDelta: 0.0100,
        }}
      //customMapStyle={customStyle}  //cambio a modo oscuro el mapa
      >
        {isLoading ? null : parqueaderos.map((marker, index) => {
          if (marker.estado) {
            const coords = {
              latitude: marker.locacion.latitude,
              longitude: marker.locacion.longitude,
            };

            const metadata = `Direccion: ${marker.direccion}`;
            const imagen = marker.imagenes[0];
            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={marker.nombre}
                // description={metadata}
                onPress={() => {
                  setIsVisibleShow(true)
                  setName(marker.nombre)
                  setCoordenadas(coords);
                  setDescripcion(marker.direccion)
                  setImagenParking(imagen);

                }}
              />
            );
          }
        }

        )}

      </MapView>


      <LetsGoParking isVisibleShow={isVisibleShow} setIsVisibleShow={setIsVisibleShow}
        name={name} coordenadas={coordenadas} descripcion={descripcion} imagenParking={imagenParking}
      />


    </View>

  );
}


// onPress={() => { mostrarDatos(marker.nombre, coords, metadata) }}

function LetsGoParking(props) {
  const { isVisibleShow, setIsVisibleShow
    , name, coordenadas, descripcion, imagenParking } = props;


  const openAppMap = () => {
    setIsVisibleShow(false);
    console.log(name);
    openMap(
      {
        // latitude: coordenadas.latitude,
        // longitude: coordenadas.longitude,
        end: `${coordenadas.latitude},${coordenadas.longitude}`,
        navigate_mode: 'navigate',//de una abre  la ruta de google maps
        query: name,
        zoom: 20,
      }
      // provider: 'apple',
    )
  }


  return (
    <Modal isVisible={isVisibleShow} setIsVisible={setIsVisibleShow}>
      {
        isVisibleShow ? (
          <View >
            <View style={styles.boxView}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: 10 }}>{name}</Text>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'stretch',
                  borderRadius: 10,
                  marginTop: 10,

                }}
                source={imagenParking ? { uri: imagenParking } : require('../../../assets/not-found-park.png')}

              />
              <Text>Direccion : {descripcion} </Text>
              <Text> Coordenadas : {coordenadas.latitude}</Text>
              <Text> Gas CO :</Text>


            </View>

            <View style={styles.viewMapBtn}>
              <Button
                title="ir a Parqueadero"
                containerStyle={styles.viewMapBtnContainerGuardar}
                buttonStyle={styles.viewMapBtnGuardar}
                onPress={() => openAppMap()}
              />
              <Button
                title="Cancelar Parqueadero"
                containerStyle={styles.viewMapBtnContainerCancel}
                buttonStyle={styles.viewMapBtnCancel}
                onPress={() => setIsVisibleShow(false)}
              />
            </View>
          </View>
        ) : (
          <View>

          </View>

        )
      }



    </Modal>
  )
}

// latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,

const styles = StyleSheet.create({
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#c51d34",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  viewMapBtnContainerGuarda: {
    paddingRight: 5
  },
  viewMapBtnGuardar: {
    backgroundColor: "#35682d",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  boxView: {
    alignItems: "center", justifyContent: "center", backgroundColor: '#f4f4f4'
    , borderRadius: 5
  }

})