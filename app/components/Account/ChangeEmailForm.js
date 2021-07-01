import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import { Reauthenticate } from '../../utils/api';
import * as firebase from 'firebase';

export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUseInfo } = props;
    const [formData, setFormData] = useState(defaulValue());
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);//espiner de carga

    // console.log(formData);


    const onSubmit = () => {
        setErrors({});
        if (!formData.email || formData.email === email) {
            setErrors({
                email: "El Email no a cambiado"
            })
        } else if (!validateEmail(formData.email)) {
            setErrors({
                email: "Email no valido!"
            })
        } else if (!formData.password) {
            setErrors({
                password: "La contrasena no puede estar vacia."
            })
        }
        else {
            setIsLoading(true);
            Reauthenticate(formData.password)
                .then((response) => {
                    firebase.auth()
                        .currentUser.updateEmail(formData.email)
                        .then(() => {
                            updateUserEmail();
                        }).catch(() => {
                            setErrors({
                                email: "Error al actualizar el email."
                            })
                            setIsLoading(false)
                        })
                }).catch(() => {
                    setIsLoading(false);
                    setErrors({ password: "La contrasena no es correcta." });
                })
        }
    }


    const updateUserEmail = () => {
        firebase.auth().onAuthStateChanged((user) => {
            const update = {
                email: formData.email
            }
            firebase.firestore().collection("users").doc(user.uid).update(update)
                .then(() => {
                    setIsLoading(false)
                    setReloadUseInfo(true)
                    toastRef.current.show('Email actualizado correctamente.')
                    setShowModal(false)
                }).catch((error) => {

                })
        })

    }


    const onChange = (e, type) => {

        setFormData({ ...formData, [type]: e.nativeEvent.text })
        console.log(type);
    }

    return (
        <View style={styles.view} >
            <Input
                placeholder="correo"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                defaultValue={email || ""}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />

            <Input
                placeholder="Contrasena"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}

                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />

            <Button
                containerStyle={styles.btnContainer}
                title="Cambiar Email"
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}//muestra el espiner de carga dependiendo del valor
            />

        </View>
    );

}

function defaulValue() {
    return {
        email: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 10,
        paddingBottom: 10

    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    }, btn: {
        backgroundColor: '#00a680'
    }
})