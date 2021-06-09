import React, { useState, useRef, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function Favorites(props) {
    const { navigation } = props;
    const [parkings, setParkings] = useState([]);
    const [userLogged, setUserLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const toastRef = useRef();


    //verificando si el usuario esta logeado
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });


    //trayendo los parqueaderos favoritos del usuario que inicio sesion
    useFocusEffect(
        useCallback(() => {
            if (userLogged) {
                const idUser = firebase.auth().currentUser.uid;
                db.collection("favoritos")
                    .where("idUser", "==", idUser)
                    .get()
                    .then((response) => {
                        const idParkingArray = [];
                        response.forEach((doc) => {
                            idParkingArray.push(doc.data().idParking);
                        });
                        getDataParking(idParkingArray).then((response) => {
                            const parqueaderos = [];
                            response.map(doc => {
                                const parking = doc.data();
                                parking.id = doc.id;
                                parqueaderos.push(parking);
                            })
                            setParkings(parqueaderos);
                        })
                    });
            }
            setReloadData(false);
        }, [userLogged, reloadData])
    );


    const getDataParking = (idParkingArray) => {
        const arrayParkings = [];
        idParkingArray.forEach((idParking) => {
            const result = db.collection("parqueaderos").doc(idParking).get();
            arrayParkings.push(result);
        });
        return Promise.all(arrayParkings);
    }

    if (!userLogged) {
        return <UserNoLogged navigation={navigation} />;
    }

    //spiner mietras carga los parqueaderos
    if (!parkings) {
        return <Loading isVisible={true} text="Cargango Parqueaderos.." />
    }

    //si no hay parquaderos, retorno el componente vacio.
    if (parkings.length === 0) {
        return <NotFoundParkings />;
    }


    return (
        <View>
            <Text>
                favorites...
            </Text>
        </View>
    );
}

function NotFoundParkings() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                No tienes parqueaderos en tu lista
        </Text>
        </View>
    );
}


//componente cuando usuario no este logeado
function UserNoLogged(props) {
    const { navigation } = props;

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                Necesitas estar logeado para ver esta sección
        </Text>
            <Button
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#00a680" }}
                onPress={() => navigation.navigate("login")}
            />
        </View>
    );
}
