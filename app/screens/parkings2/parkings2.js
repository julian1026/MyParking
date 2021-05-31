import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
import "firebase/firestore";

import ListParking from '../../components/Parkings2/ListParking';

const db = firebase.firestore(firebaseApp);

export default function Parkings2(props) {
    const { navigation } = props
    const [user, setUser] = useState(null);
    const [parqueaderos, setParqueaderos] = useState([]);
    const [totalParqueaderos, setTotalParqueaderos] = useState(0);
    const [startParqueadero, setStartParqueadero] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const limiteParqueaderos = 10;



    //si el usuario esta logeado muestra boton 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            // console.log(userInfo.email)
            setUser(userInfo);
        })
    }, []);

    //esta funcion vuelve cargar los parqueadros cada ves que se selecione la screen
    useFocusEffect(
        useCallback(() => {
            db.collection('parqueaderos').get().then((snap) => { // trayendo la collection paequeaderos de firestore
                setTotalParqueaderos(snap.size);
            })

            const resultParking = [];

            db.collection("parqueaderos")
                .orderBy("createAt", "desc")
                .limit(limiteParqueaderos).get().then((response) => {
                    setStartParqueadero(response.docs[response.docs.length - 1]);

                    response.forEach((doc) => {
                        const parqueadero = doc.data();
                        parqueadero.id = doc.id;
                        resultParking.push(parqueadero)
                    })
                    setParqueaderos(resultParking);
                })
        }, [])

    );





    //segunda carga de parqueaderos, esta function la paso como props a ListParking

    const cargandoMasParqueaderos = () => {
        const resultParqueaderos = [];
        // console.log(parqueaderos.length);
        // console.log(totalParqueaderos);

        parqueaderos.length < totalParqueaderos && setIsLoading(true);

        db.collection("parqueaderos")
            .orderBy("createAt", "desc")
            .startAfter(startParqueadero.data().createAt)
            .limit(limiteParqueaderos)
            .get()
            .then((response) => {
                if (response.docs.length > 0) {
                    setStartParqueadero(response.docs[response.docs.length - 1])
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const parqueadero = doc.data();
                    parqueadero.id = doc.id;
                    resultParqueaderos.push(parqueadero);
                })
                setParqueaderos([...parqueaderos, ...resultParqueaderos]);
            })

    };

    return (
        <View style={styles.viewBody}>

            <ListParking
                parqueaderos={parqueaderos}
                cargandoMasParqueaderos={cargandoMasParqueaderos}
                isLoading={isLoading}
            />
            {user && (
                <Icon
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate('addParqueaderos2')}
                />
            )}

        </View>
    );
}



const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,

    }
})