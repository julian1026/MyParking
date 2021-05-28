import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { map, size, filter } from 'lodash'
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'

import Modal from '../modal'


const widthScreen = Dimensions.get("window").width;

export default function AddParkingForm(props) {
    const { toastRef, setIsloading, navigation } = props;
    const [parkingName, setParkingName] = useState("");
    const [addres, setAddres] = useState("");
    const [description, setDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [ubicationParking, setUbicationParking] = useState(null);



    const addParking = () => {
        console.log(ubicationParking)
        console.log(imageSelected);
        console.log('parkingName : ' + parkingName);
        console.log('addres: ' + addres);
        console.log('description:' + description);
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
                    color: "#d32f2f",

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
        backgroundColor: "#00af8a",
        margin: 20
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