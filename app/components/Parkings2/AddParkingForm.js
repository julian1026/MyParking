import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


export default function AddParkingForm(props) {
    const { toastRef, setIsloading, navigation } = props;
    const [parkingName, setParkingName] = useState("");
    const [addres, setAddres] = useState("");
    const [description, setDescription] = useState("");

    const addParking = () => {
        console.log('parkingName : ' + parkingName);
        console.log('addres: ' + addres);
        console.log('description:' + description);
    }

    return (

        <ScrollView style={styles.scrollView} >

            <FormAdd
                setParkingName={setParkingName}
                setAddres={setAddres}
                setDescription={setDescription}
            />

            <UploadImage />

            <Button
                title="Crear Restaurante"
                onPress={addParking}
                buttonStyle={styles.btnAddParking}
            />

        </ScrollView>

    );
}

//componente donde creo los input de los formularios
function FormAdd(props) {
    const { setDescription, setParkingName, setAddres } = props;
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

function UploadImage() {

    const imageSelect = () => {
        console.log('imagenes .....')
    }
    return (
        <View style={styles.viewImage}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
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
    }


})