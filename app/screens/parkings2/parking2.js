import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import Loading from '../../components/Loading'
import { useFocusEffect } from "@react-navigation/native";
import { Rating, ListItem, Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import { map } from 'lodash';
import Toast from 'react-native-easy-toast';
import firebase from 'firebase/app'
import "firebase/firestore";
import Carousels from '../../components/Carousel';
import Map from '../../components/Map';
import Reviews from '../../components/Parkings2/Reviews';



const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;


export default function Parking2(props) {
    const { navigation, route } = props;
    const { id, nombre } = route.params;
    const [parqueaderoDatos, setParqueaderoDatos] = useState(null);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();

    //verificando si el usuario esta logeado
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    navigation.setOptions({ title: nombre })//nombre del parqueadero


    //obteniendo la informacion de un parqueadero en especifico, se ejecuta cada ves que selecciono la screen
    useFocusEffect(
        useCallback(() => {
            db.collection("parqueaderos").doc(id).get().then((response) => {
                const datos = response.data();
                datos.id = response.id;

                setParqueaderoDatos(datos);
                setRating(datos.rating)
            })
        }, [])
    );

    //comprobando si el restaurante esta en favoritos 

    useEffect(() => {
        if (userLogged && parqueaderoDatos) {
            db.collection('favoritos')
                .where('idParking', '==', parqueaderoDatos.id)
                .where('idUser', '==', firebase.auth().currentUser.uid)
                .get()
                .then((response) => {
                    if (response.docs.length === 1) {
                        setIsFavorite(true);
                    }
                })
        }
    }, [userLogged, parqueaderoDatos])



    //guardando parqueadero en favoritos
    const addFavorite = () => {

        if (!userLogged) {
            toastRef.current.show('Debe estar logeado para poder agregar este parqueadero a favoritos...', 2000);
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idParking: parqueaderoDatos.id
            };
            db.collection('favoritos')
                .add(payload)
                .then(() => {
                    setIsFavorite(true);
                    toastRef.current.show('Parqueadero agregado a favoritos');
                }).catch(() => {
                    toastRef.current.show('Error al agregar el parqueadero a favoritos');
                })
        }
    }


    //eliminando de favoritos
    const removeFavorite = () => {
        db.collection('favoritos')
            .where('idParking', '==', parqueaderoDatos.id)
            .where('idUser', '==', firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach(doc => {
                    const idFavorito = doc.id;
                    db.collection('favoritos')
                        .doc(idFavorito)
                        .delete()
                        .then(() => {
                            setIsFavorite(false);
                            toastRef.current.show('Eliminado de Favoritos', 1000);
                        }).catch(() => {
                            toastRef.current.show('Error al eliminar el parqueadero de favoritos');
                        })
                });
            })
    }


    if (!parqueaderoDatos) return (<Loading isVisible={true} text="Cargango" />);


    return (
        <ScrollView vertical style={styles.viewBody} >
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <Carousels
                arrayImages={parqueaderoDatos.imagenes}
                height={250}
                width={screenWidth}

            />
            <TitleParking
                nombre={parqueaderoDatos.nombre}
                descripcion={parqueaderoDatos.descripcion}
                rating={rating}
            />
            <ParkingInfo
                nombre={parqueaderoDatos.nombre}
                locacion={parqueaderoDatos.locacion}
                direccion={parqueaderoDatos.direccion}

            />
            <Reviews
                navigation={navigation}
                idParking={parqueaderoDatos.id}
                setRating={setRating}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

//funcion para el nombre y el rating
function TitleParking(props) {
    const { nombre, descripcion, rating } = props;

    return (
        <View style={styles.viewParqueaderoTitulo}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.nombreParqueadero}>{nombre}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}

                />
            </View>
            <Text style={styles.descripcionParqueadero}>
                {descripcion}
            </Text>
        </View>
    )

}

//funcion encarga de llamar a el mapa de la screen individual
function ParkingInfo(props) {
    const { nombre, locacion, direccion } = props;


    //arreglo de datos que se muestra al final del map se agregan a la lista
    const listInfo = [{
        text: direccion,
        iconName: "map-marker",
        iconType: "material-community",
        action: null,
    }];

    return (
        <View style={styles.viewParkingInfo}>
            <Text style={styles.parkingInfoTitle}>
                Informacion de Parqueadero
            </Text>
            <Map
                nombre={nombre}
                locacion={locacion}
                height={100}
            />
            {map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680",
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewParqueaderoTitulo: {
        padding: 15
    },
    nombreParqueadero: {
        fontSize: 20,
        fontWeight: "bold"
    },
    descripcionParqueadero: {
        marginTop: 5,
        color: "grey"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    viewParkingInfo: {
        margin: 15,
        marginTop: 25
    },
    parkingInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1,
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15,
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15,
    }
})
