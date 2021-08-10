import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Icon, Avatar, Input, Button } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Modal from '../modal';
import openMap from "react-native-open-maps";
import { variablesAmbientales } from '../../data/data.json'
import Loading from '../Loading'


const mensajes = [
    'Parqueadero con menos concentracion de CO y a la vez el mas cercano',
    'Parqueadero  con menos concentracion de CO',
    'Parqueadero  mas cercano',
    'Es el segundo parqueadero mas cercano'
]


export default function Recomendacion(props) {
    let { isVisibleAlert, setIsVisibleAlert, parqueaderos, bandera, setBandera } = props;
    const [ParkingInfo, setParkingInfo] = useState([])
    const [location, setLocation] = useState(null)
    const [masCercano, setMasCercano] = useState(null)
    const [menosContaminado, setMenosContaminado] = useState(null);
    // const [bandera, setBandera] = useState(0)
    const mensaje = mensajes;
    const toastRef = useRef();


    useFocusEffect(
        useCallback(() => {
            obtenerUbicacion();
        }, [bandera])
    );

    // console.log(parqueaderos);


    const obtenerUbicacion = () => {
        (async () => {
            setMasCercano(null)
            setMenosContaminado(null)
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            )
            console.log(bandera)
            const statusPermission = resultPermissions.permissions.location.status;
            if (statusPermission !== "granted") {
                toastRef.current.show("tienes que aceptar los permisos de localizacion para crear un parqueadero, ve a configuracion de tu celular y asigna los permisos correspondientes", 4000)
            } else {
                const loc = await Location.getCurrentPositionAsync({});

                if (bandera < 5) {
                    valor = bandera + 1;
                    setBandera(valor);
                    setLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    })
                    distanciaEuclidiana()
                }
                if (!location) {
                    setIsVisibleAlert(true);
                }
            }
        })()

    }



    //asignando la cercania a cada parqueadero
    const distanciaEuclidiana = () => {
        if (location) {
            setParkingInfo(null)
            let parkings = [], x1 = location.longitude, y1 = location.latitude

            parqueaderos.map((value) => {
                if (value.estado) {
                    if (variablesAmbientales[value.id]) {
                        let x2 = value.locacion.longitude, y2 = value.locacion.latitude
                        let dist = Math.sqrt(Math.pow(((x2) - (x1)), 2) + Math.pow(((y2) - (y1)), 2));
                        value['cercania'] = dist;
                        parkings.push(value);
                    }
                }
            })

            setParkingInfo(parkings);
            asignarVariableAmbiental();
        }
    }


    //asignando la variable ambiantal a cada parqueadero
    const asignarVariableAmbiental = () => {
        let corte = 15;

        ParkingInfo.map((values) => {
            if (variablesAmbientales[values.id]) {
                let datos = variablesAmbientales[values.id].slice(0, corte); //asignando tamano fijo del array

                let dividendo = datos.reduce((a, b) => a + b, 0);
                let valor = dividendo / corte;
                values['ambiente'] = valor;
            }

        })
        ordenar()

    }


    //esta funcion asigna que parqueadero es el menos contaminado  y el menos lejano
    const ordenar = () => {
        setMenosContaminado(null);
        setMasCercano(null);
        const x = [...ParkingInfo];
        const z = [...ParkingInfo];
        let cercania = x.sort(function (a, b) { return a.cercania - b.cercania });
        let ambiente = z.sort(function (a, b) { return a.ambiente - b.ambiente });

        if (ambiente[0]) {
            if (ambiente[0].id == cercania[0].id) {
                ambiente[0]['posicion'] = 0;
                cercania[1]['posicion'] = 3;


                setMenosContaminado(ambiente[0]);
                setMasCercano(cercania[1]);

                console.log('campeona')
            } else {
                ambiente[0]['posicion'] = 1;
                cercania[0]['posicion'] = 2;
                setMenosContaminado(ambiente[0]);
                setMasCercano(cercania[0]);
            }


        }

    }


    const openAppMap = (valor) => {
        setIsVisibleAlert(false);

        let { locacion, nombre } = valor;
        console.log(locacion)


        openMap(
            {
                end: `${locacion.latitude},${locacion.longitude}`,
                navigate_mode: 'navigate',//de una abre  la ruta de google maps
                query: nombre,
                zoom: 20,
            }
            // provider: 'apple',
        )
    }




    return (
        <Modal
            isVisible={isVisibleAlert}
            setIsVisible={setIsVisibleAlert}
        >

            <View style={styles.viewContainer}>

                <View style={styles.boxViewPrimaria} >
                    {(menosContaminado && bandera == 5) ? (
                        <View style={styles.separador} >
                            <Text style={{ fontWeight: 'bold' }}>
                                {mensaje[menosContaminado['posicion']]}
                            </Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontWeight: 'bold' }}>1</Text>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 50,
                                        resizeMode: 'stretch',
                                        borderRadius: 50,
                                        marginTop: 10,
                                        // alignSelf: 'f'

                                    }}
                                    source={menosContaminado.imagenes[0] ? { uri: menosContaminado.imagenes[0] } : require('../../../assets/not-found-park.png')}

                                />
                            </View>
                            <Text style={{ fontWeight: 'bold' }}>Nombre: {menosContaminado['nombre']}</Text>
                            <Text>Direccion: {menosContaminado['direccion']}</Text>
                            <Text>CO: {menosContaminado['ambiente']}</Text>
                            <Button
                                title="ir"
                                containerStyle={styles.viewMapBtnContainerGuardar}
                                buttonStyle={styles.viewMapBtnGuardar}
                                onPress={() => openAppMap(menosContaminado)}
                            />


                        </View>
                    ) : (
                        <Text>Cargando Recomendacion...</Text>
                    )}
                </View>
                <View style={styles.boxViewSegundaria} >
                    {(masCercano && bandera == 5) ? (
                        <View style={styles.separador}>

                            <Text style={{ fontWeight: 'bold' }} >
                                {mensaje[masCercano['posicion']]}
                            </Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={{ fontWeight: 'bold' }}>2</Text>
                                <Image
                                    style={{
                                        width: 150,
                                        height: 75,
                                        resizeMode: 'stretch',
                                        borderRadius: 50,
                                        marginTop: 10,
                                        alignSelf: 'flex-start'

                                    }}
                                    source={masCercano.imagenes[0] ? { uri: masCercano.imagenes[0] } : require('../../../assets/not-found-park.png')}

                                />
                            </View>

                            <Text style={{ fontWeight: 'bold' }} >Nombres: {masCercano['nombre']}</Text>
                            <Text>Direccion: {masCercano['direccion']}</Text>
                            <Text>CO: {masCercano['ambiente']}</Text>
                            <Button
                                title="ir"
                                containerStyle={styles.viewMapBtnContainerGuardar}
                                buttonStyle={styles.viewMapBtnGuardar}
                                onPress={() => openAppMap(masCercano)}
                            />


                        </View>
                    ) : (
                        <Text>Cargando Recomendacion...</Text>
                    )}
                </View>


                <View style={styles.viewCancel}>
                    <Button
                        title="Salir"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => {
                            setIsVisibleAlert(false)
                        }} />
                </View>




            </View>



        </Modal>

    )
}



const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10

    },
    boxViewPrimaria: {
        backgroundColor: '#a4d1a3',
        marginTop: 10
    },
    boxViewSegundaria: {
        backgroundColor: '#fbde98',
        marginTop: 10
    },
    viewMapBtnContainerGuarda: {
        padding: 40

    },
    viewMapBtnGuardar: {
        backgroundColor: "#35682d",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    viewCancel: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#c51d34",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    separador: {
        margin: 10,
        alignItems: "center",

    }

})



// let numeros = [1, 2, 3, 4, 5];
// let total = numeros.reduce((a, b) => a + b, 0);
// console.log(numeros)
// console.log(total)



