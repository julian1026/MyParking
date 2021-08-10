import React, { useState, useCallback, useRef } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import ListTopRanking from '../components/Ranking/ListTopRanking';

const db = firebase.firestore(firebaseApp);

export default function TopParkings(props) {
    const { navigation } = props;
    const [parkings, setParkings] = useState([]);
    const toastRef = useRef();

    //trayendo los 5 primesros parqueaderos


    useFocusEffect(
        useCallback(() => {
            db.collection("parqueaderos")
                .orderBy("rating", "desc")
                .limit(5)
                .get()
                .then((response) => {
                    const parkingArray = [];
                    response.forEach((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        parkingArray.push(data);
                    });
                    setParkings(parkingArray);
                });
        }, [])

    );

    return (
        <View>
            <ListTopRanking parkings={parkings} navigation={navigation} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}

