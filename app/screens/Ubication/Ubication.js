import React, { useState, useEffect, useCallback } from 'react';
import { ColorPropType } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Loading from '../../components/Loading';
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
import "firebase/firestore";



import Maps from '../../components/Ubication/maps'
import Mapa2 from '../../components/Ubication/mapa2'
import { askAsync } from 'expo-permissions';

const db = firebase.firestore(firebaseApp);


export default function Ubication() {
    const [parqueaderos, setParqueaderos] = useState([]);
    const [startParqueadero, setStartParqueadero] = useState(null);
    const [totalParqueaderos, setTotalParqueaderos] = useState(0);
    const [isLoading, setIsLoading] = useState(true)




    //esta funcion vuelve cargar los parqueadros cada ves que se selecione la screen
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
        </View>

    );
}



// <View style={styles.viewBody}>
// </View>


const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    }
})