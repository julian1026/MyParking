import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';
import { useNavigation } from "@react-navigation/native";


export default function ListParking(props) {
    const { parqueaderos, isLoading, cargandoMasParqueaderos } = props;
    const navigation = useNavigation();

    return (
        <View>


            {size(parqueaderos) > 0 ? (
                <FlatList
                    data={parqueaderos}
                    renderItem={(parqueadero) =>
                        <Parqueadero
                            parqueadero={parqueadero}
                            navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={cargandoMasParqueaderos}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                />
            ) : (
                <View style={styles.loaderParkings}>
                    <ActivityIndicator size='large' />
                    <Text>cargando parqueaderos ...</Text>
                </View>
            )
            }

        </View>
    )
}
//rfnc
// function para cargar mas parqueaderos

function FooterList(props) {
    const { isLoading } = props;

    if (isLoading) {
        return (
            <View style={styles.loaderParkings}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <View style={styles.notFoundParking}>
                <Text>No quedan parqueaderos por cargar</Text>
            </View>
        )

    }
}

//function especifica de parqueadero refenrente a la ubicaion en la lista
function Parqueadero(props) {
    const { parqueadero, navigation } = props;

    const { id, imagenes, nombre, direccion, descripcion } = parqueadero.item;
    const imageParking = imagenes[0];

    //funcion para ir a un parqueadero especifico
    const irParqueadero = () => {
        console.log('ok');
        navigation.navigate("parking2", { id, nombre });
    }



    return (
        <TouchableOpacity
            onPress={irParqueadero}//viajando a pantalla especifica de un parqueadero
        >
            <View style={styles.viewParking}>
                <View style={styles.viewParkingImage}>
                    <Image
                        resizeMode="cover"
                        placeHolderContent={<ActivityIndicator color="fff" />}
                        source={
                            imageParking ?
                                { uri: imageParking }
                                : require('../../../assets/no-image.png')
                        }
                        style={styles.imageParking}
                    />
                </View>
                <View>
                    <Text style={styles.parkingName}>{nombre}</Text>
                    <Text style={styles.parkingAddres}>{direccion}</Text>
                    <Text style={styles.parkingDirection}>{descripcion.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    loaderParkings: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    viewParking: {
        flexDirection: 'row',
        margin: 10
    },
    viewParkingImage: {
        marginRight: 15
    },
    imageParking: {
        width: 80,
        height: 80
    },
    parkingName: {
        fontWeight: 'bold'
    },
    parkingAddres: {
        paddingTop: 2,
        color: "grey"
    },
    parkingDirection: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },
    notFoundParking: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    }
})
