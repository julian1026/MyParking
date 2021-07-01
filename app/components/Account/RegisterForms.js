import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { Input, Icon, Button } from 'react-native-elements'
import Loading from '../Loading'
import { validateEmail } from '../../utils/validations'
import { size, isEmpty } from 'lodash'
// import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPass, setShowPass] = useState(false);
    const [showPassRepeat, setShowPassRepeat] = useState(false)
    const [FormData, setFormData] = useState(CapturarDatos())
    const [loading, setloading] = useState(false);
    const navigation = useNavigation();


    const onSubmit = () => {
        if (isEmpty(FormData.email) || isEmpty(FormData.pass) || isEmpty(FormData.repeatPass)) {
            toastRef.current.show('todos los campos son requeridos')
        } else if (!validateEmail(FormData.email)) {
            toastRef.current.show('email no valido')
        } else if (FormData.pass !== FormData.repeatPass) {
            toastRef.current.show('la contraseña no coincide')
        } else if (size(FormData.pass) < 6) {
            toastRef.current.show('la contraseña como minimo seis caracteres')
        }
        else {
            setloading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(FormData.email, FormData.pass)
                .then(() => {
                    createUser();
                })
                .catch(err => {
                    setloading(false);
                    toastRef.current.show('El email ya esta en uso, pruebe con otro')
                });
        }
    }

    //creando coleccion users
    const createUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const id = user.uid;
                const globalUser = user.providerData[0];
                const dataUser = {
                    displayName: globalUser.displayName,
                    email: globalUser.email,
                    rol: 'user',
                    photoURL: null,
                    status: true
                }
                db.collection("users").doc(id).set(dataUser)
                    .then(() => {
                        setloading(false);
                        navigation.navigate('account')
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }

        })
    }


    const onChange = (e, type) => {
        // console.log(type)
        // console.log(e.nativeEvent.text)
        //setFormData({[type]:e.nativeEvent.text})
        setFormData({ ...FormData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.containerFirst}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, 'email')}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.IconRight}
                    />
                }
            />
            <Input
                placeholder='contrasena'
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, 'pass')}
                password={true}
                secureTextEntry={showPass ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPass ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.IconRight}
                        onPress={() => setShowPass(!showPass)}
                    />
                }
            />
            <Input
                placeholder='repetir contrasena'
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, 'repeatPass')}
                password={true}
                secureTextEntry={showPassRepeat ? false : true}//el securete permite si se ve o no la contra
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassRepeat ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.IconRight}
                        onPress={() => setShowPassRepeat(!showPassRepeat)}
                    />
                }
            />

            <Button
                title='Unirse'
                buttonStyle={[styles.BtnStyle]}
                containerStyle={styles.btnRegister}
                onPress={onSubmit}

            />
            <Loading isVisible={loading} text='Creando Cuenta' />
        </View>

    );
}

function CapturarDatos() {
    return {
        email: '',
        pass: '',
        repeatPass: '',
    }

}


///oeooee
const styles = StyleSheet.create({
    containerFirst: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%',
        marginTop: 10
    },
    btnRegister: {
        marginTop: 20,
        width: '95%'
    },
    BtnStyle: {
        backgroundColor: '#008080',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    IconRight: {
        color: '#c1c1c1'
    }
})