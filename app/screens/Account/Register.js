import React, {useRef} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view' //no deja que se oculten los input
import Toast from 'react-native-easy-toast'
import RegisterForm from '../../components/Account/RegisterForms'

export default function Register(){
    const toastRef=useRef();
    // console.log(toastRef);
    return(
        <KeyboardAwareScrollView>
            <Image source={require('../../../assets/img/img3.png')}
                resizeMode='contain'
                style={styles.logo}
             />
             <View style={styles.ViewForm}>
                <RegisterForm toastRef={toastRef} />
             </View>
            <Toast ref={toastRef} position='center' opacity={0,9} />
        </KeyboardAwareScrollView>
    );
}

const styles=StyleSheet.create({
    logo:{
        width:'100%',
        height:150,
        marginTop:20
    },
    ViewForm:{
       marginRight:40,
       marginLeft:40,
        
    }
})