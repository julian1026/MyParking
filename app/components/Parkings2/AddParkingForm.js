import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { map, size, filter } from 'lodash';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../modal';
import uuid from 'random-uuid-v4';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);



const widthScreen = Dimensions.get("window").width;

export default function AddParkingForm(props) {
    const { toastRef, setIsloading, navigation } = props;
    const [parkingName, setParkingName] = useState("");
    const [addres, setAddres] = useState("");
    const [description, setDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [ubicationParking, setUbicationParking] = useState(null);


    //funcion  que guarda la informacion en firestore
    const addParking = () => {

        if (!parkingName || !addres || !description) {
            toastRef.current.show("Todos los campos del formulario son obligatorios", 1000)
        } else if (size(imageSelected) === 0) {
            toastRef.current.show("El parqueadero debe de tener almenos una foto", 1000)
        } else if (!ubicationParking) {
            toastRef.current.show("Tienes que localizar el parqueadero en el mapa", 1000)
        } else {
            setIsloading(true);
            uploadImageStorage().then((response) => {

                db.collection("parqueaderos")
                    .add({
                        nombre: parkingName,
                        direccion: addres,
                        descripcion: description,
                        locacion: ubicationParking,
                        imagenes: response,
                        rating: 0,
                        ratingTotal: 0,
                        quantityVoting: 0,
                        createAt: new Date(),
                        createBy: firebase.auth().currentUser.uid,
                    })
                    .then(() => {
                        setIsloading(false);
                        navigation.navigate("parkings2")
                    }).catch((err) => {
                        setIsloading(false);
                        toastRef.current.show("Error al guardar el parqueadero, intentelo mas tarde");
                    })
            });
        }

    }


    //funcion  que  guarda las imagenes en firebase storage
    const uploadImageStorage = async () => {
        const imageBlob = [];
        await Promise.all(

            map(imageSelected, async (image) => {
                const response = await fetch(image);
                const blob = await response.blob();

                const ref = firebase.storage().ref("parkingImage").child(uuid());
                await ref.put(blob).then(async (result) => {
                    await firebase
                        .storage()
                        .ref(`parkingImage/${result.metadata.name}`)
                        .getDownloadURL()
                        .then((photoUrl) => {
                            imageBlob.push(photoUrl);
                        });
                })
            })
        )
        return imageBlob;

    }

    return (

        <ScrollView style={styles.scrollView} >
            <ImagePrincipal
                imageSelected={imageSelected[0]}
            />

            <FormAdd
                setParkingName={setParkingName}
                setAddres={setAddres}
                setDescription={setDescription}
                setIsVisibleMap={setIsVisibleMap}
                ubicationParking={ubicationParking}
            />

            <UploadImage
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
            />

            <Button
                title="Crear Parqueadero"
                onPress={addParking}
                buttonStyle={styles.btnAddParking}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setUbicationParking={setUbicationParking}
                toastRef={toastRef}
            />

        </ScrollView>

    );
}



//componente para visualizar mapa y capturar ubicacion
function Map(props) {
    const { isVisibleMap, setIsVisibleMap, setUbicationParking, toastRef } = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            )

            const statusPermission = resultPermissions.permissions.location.status;
            if (statusPermission !== "granted") {
                toastRef.current.show("tienes que aceptar los permisos de localizacion para crear un parqueadero, ve a configuracion de tu celular y asigna los permisos correspondientes", 4000)
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })

            }
        })()
    }, [])

    const confirmLocation = () => {
        setUbicationParking(location);
        toastRef.current.show("Ubicacion guardada correctamente :)")
        setIsVisibleMap(false);
    }


    return (
        <Modal
            isVisible={isVisibleMap}
            setIsVisible={setIsVisibleMap}
        >
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >

                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude

                            }}
                            draggable
                        />

                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerGuardar}
                        buttonStyle={styles.viewMapBtnGuardar}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>

    )

}

//funcion que muestra la imagen principal
function ImagePrincipal(props) {
    const { imageSelected } = props;

    return (
        <View style={styles.viewPhoto} >
            <Image

                source={imageSelected ?
                    { uri: imageSelected }
                    : require("../../../assets/no-image.png")}
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    )
}


//componente donde creo los input de los formularios
function FormAdd(props) {
    const { setDescription, setParkingName, setAddres, setIsVisibleMap, ubicationParking } = props;
    return (
        <View style={styles.viewForm} >
            <Input
                placeholder="Nombre del Parqueadero"
                containerStyle={styles.input}
                onChange={e => setParkingName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Direccion"
                containerStyle={styles.input}
                onChange={e => setAddres(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: ubicationParking ? "#00a680" : "#d32f2f",

                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder="Descripcion del parqueadero"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setDescription(e.nativeEvent.text)}
            />
        </View>
    );
}


//obtengo la uri de la imagen selecionada y la mando al arreglo
function UploadImage(props) {
    const { toastRef, setImageSelected, imageSelected } = props


    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        )
        if (resultPermissions == "danied") {
            toastRef.current.show("Se necesita permisos para poder acceder a la galeria, si los has reschazado tienes queir a ajuste y activalos manualmente. ", 4000)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (result.cancelled) {
                toastRef.current.show("Has cerrado la galeria sin selecionar ninguna imagen ", 4000)
            } else {
                setImageSelected([...imageSelected, result.uri])
            }

        }
    }

    //elimino imagen seleccionada
    const removeImagen = (imageUriEliminar) => {
        Alert.alert(
            "Eliminar Imagenes",
            "Estas seguro de eliminar esta imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        const nueva = filter(imageSelected, (imagenUri) => imagenUri !== imageUriEliminar);
                        setImageSelected(nueva);
                    }
                }
            ],
            { cancelable: false }
        )

    }

    return (
        <View style={styles.viewImage}>
            {size(imageSelected) < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}

            {map(imageSelected, (imagenUri, index) => (
                <Avatar
                    key={index}
                    style={styles.miniature}
                    source={{ uri: imagenUri }}
                    onPress={() => removeImagen(imagenUri)}
                />
            ))}


        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnAddParking: {
        backgroundColor: "#008080",
        margin: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniature: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: '100%',
        height: 500
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    viewMapBtnContainerGuarda: {
        paddingRight: 5
    },
    viewMapBtnGuardar: {
        backgroundColor: "#00a680"
    }

})