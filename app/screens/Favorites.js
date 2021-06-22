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
    if (parkings?.length === 0) {
        return <NotFoundParkings />;
    }

    return (
        <View style={styles.viewBody}>
            {parkings ? (
                <FlatList
                    data={parkings}
                    renderItem={(parking) => (
                        <Parking
                            parking={parking}
                            setIsLoading={setIsLoading}
                            toastRef={toastRef}
                            setReloadData={setReloadData}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <View style={styles.loaderParkings}>
                    <ActivityIndicator size="large" />
                    <Text style={{ textAlign: "center" }}>Cargando parqueaderos</Text>
                </View>
            )}
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text="Eliminando parqueadero" isVisible={isLoading} />
        </View>
    );

}


//componente paracuando no tengas parqueaderos en favoritos
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
                buttonStyle={{
                    backgroundColor: "#008080",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}
                onPress={() => navigation.navigate("account", { screen: "login" })}
            />
        </View>
    );
}


//componente que devuelve cada parqueadero a la lista de favoritos
function Parking(props) {
    const { parking, setIsLoading, toastRef, setReloadData, navigation } = props;

    const { nombre, id, imagenes } = parking.item;


    //funcion que abre alerta
    const confirmarRemoverFavorito = () => {
        Alert.alert(
            "Eliminar Parqueadero de Favoritos",
            "¿Estas seguro de que quieres eliminar el parqueadero de favoritos?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: removerFavorito,
                },
            ],
            { cancelable: false }
        );
    }

    //funcion de eliminar parqueadero
    const removerFavorito = () => {
        setIsLoading(true);
        db.collection("favoritos")
            .where("idParking", "==", id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach(doc => {
                    idFavorito = doc.id;
                    db.collection('favoritos').doc(idFavorito)
                        .delete()
                        .then(() => {
                            setIsLoading(false);
                            setReloadData(true);
                            toastRef.current.show("Parqueadero eliminado correctamente");
                        })
                        .catch(() => {
                            setIsLoading(false);
                            toastRef.current.show("Error al eliminar el parqueadero");
                        });
                })
            })
    }



    return (
        <View style={styles.parking}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("parkings2", {// navegacion con parametros
                        screen: "parking2",
                        params: { id, nombre },
                    })
                }
            >
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={
                        imagenes[0]
                            ? { uri: imagenes[0] }
                            : require("../../assets/no-image.png")
                    }
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{nombre}</Text>
                    <Icon
                        type="material-community"
                        name="heart"
                        color="#f00"
                        containerStyle={styles.favorite}
                        onPress={confirmarRemoverFavorito}
                        underlayColor="transparent"
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loaderParkings: {
        marginTop: 10,
        marginBottom: 10,
    },
    parking: {
        margin: 10,
    },
    image: {
        width: "100%",
        height: 180,
    },
    info: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#f0ffff",
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
    },
    favorite: {
        marginTop: -35,
        backgroundColor: "#f0ffff",
        padding: 15,
        borderRadius: 100,
    },
});