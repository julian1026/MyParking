import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'

import Loading from '../Loading'
import { validateEmail } from '../../utils/validations'
import { size, isEmpty } from 'lodash'
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'


export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPass, setShowPass] = useState(false);
    const [FormData, setFormData] = useState(CapturarDatos())
    const [loading, setloading] = useState(false);
    const navigation = useNavigation();


    const onChange = (e, type) => {
        // console.log(type)
        // console.log(e.nativeEvent.text)
        //setFormData({[type]:e.nativeEvent.text})
        setFormData({ ...FormData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {
        console.log(FormData)
        if (isEmpty(FormData.email) || isEmpty(FormData.pass)) {
            toastRef.current.show('todos los campos son requeridos')
        } else if (!validateEmail(FormData.email)) {
            toastRef.current.show('email no valido')
        } else {
            setloading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(FormData.email, FormData.pass)
                .then(() => {
                    setloading(false);
                    navigation.navigate('account')
                })
                .catch(err => {
                    setloading(false);
                    toastRef.current.show('El email no esta regristrado')
                });
        }
    }

    return (
        <View style={styles.container}>
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
            <Button
                title='Iniciar Session'
                buttonStyle={[styles.BtnStyle]}
                containerStyle={styles.btnRegister}
                onPress={onSubmit}

            />
            <Loading isVisible={loading} text='Iniciando Sesion' />
        </View>
    )
}
function CapturarDatos() {
    return {
        email: '',
        pass: '',
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%',
        marginTop: 20
    },
    IconRight: {
        color: '#c1c1c1'
    },
    BtnStyle: {
        backgroundColor: '#008080',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    btnRegister: {
        marginTop: 20,
        width: '95%'
    },
})