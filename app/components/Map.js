import React from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import openMap from "react-native-open-maps"
import Modal from './modal';
export default function Map(props) {
    const { locacion, nombre, height } = props;
    // console.log(locacion);

    const openAppMap = () => {
        openMap({
            latitude: locacion.latitude,
            longitude: locacion.longitude,
            zoom: 19,
            query: nombre

        })
    }

    //=====ensayar abrir modal
    // const ensayo = () => {
    //     return (<Modal isVisible={true} >
    //         <View>
    //             <Text>hola campeon</Text>
    //         </View>

    //     </Modal>);
    // }

    return (
        <MapView
            style={{ height: height, width: "100%" }}
            initialRegion={locacion}
            onPress={openAppMap}
        >
            <MapView.Marker
                coordinate={{
                    latitude: locacion.latitude,
                    longitude: locacion.longitude
                }}
            />
        </MapView>
    )
}
