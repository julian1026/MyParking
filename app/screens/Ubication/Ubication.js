import React, { useState, useCallback } from 'react';
import { ColorPropType } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Loading from '../../components/Loading';
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
import "firebase/firestore";



import Maps from '../../components/Ubication/maps'
import Mapa2 from '../../components/Ubication/mapa2'
import Recomendacion from '../../components/Ubication/Recomendacion';


const db = firebase.firestore(firebaseApp);


export default function Ubication(props) {

    const { navigation } = props
    const [parqueaderos, setParqueaderos] = useState([]);
    const [startParqueadero, setStartParqueadero] = useState(null);
    const [totalParqueaderos, setTotalParqueaderos] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [isVisibleAlert, setIsVisibleAlert] = useState(false)
    const [bandera, setBandera] = useState(0)


    // console.log(navigation)



    // esta funcion vuelve cargar los parqueadros cada ves que se selecione la screen
    useFocusEffect(
        useCallback(() => {
            const resultParking = [];
            db.collection('parqueaderos').get().then((response) => { // trayendo la collection paequeaderos de firestore
                response.forEach((doc) => {
                    const parqueadero = doc.data();
                    parqueadero.id = doc.id;
                    resultParking.push(parqueadero)
                })
                setParqueaderos(resultParking);
                setIsLoading(false)
            })

        }, [])
    );




    //si parqueaderos no tiene datos devuelve un loading de carga
    if (!parqueaderos) return (<Loading isVisible={true} text="Cargango" />);

    return (
        <View style={styles.viewBody}>
            <Mapa2
                parqueaderos={parqueaderos}
                isLoading={isLoading}
            />
            <Icon
                type="material-community"
                name="bell-outline"
                color="#c2c2c2"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => {
                    setIsVisibleAlert(true)
                    setBandera(0);
                }}
            />
            <Recomendacion
                isVisibleAlert={isVisibleAlert}
                setIsVisibleAlert={setIsVisibleAlert}
                parqueaderos={parqueaderos}
                bandera={bandera}
                setBandera={setBandera}

            />

        </View>

    );
}





// <View style={styles.viewBody}>
// </View>

// let x2 = -5, x1 = -1, y2 = 2, y1 = 6;
// var dist = Math.sqrt(Math.pow(((x2) - (x1)), 2) + Math.pow(((y2) - (y1)), 2));
// console.log(dist)



const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    viewBody: {
        flex: 2,
        backgroundColor: '#fff'
    },
    btnContainer: {
        position: 'absolute',
        top: 10,
        right: 10

    }
})