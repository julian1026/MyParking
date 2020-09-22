import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view' //no deja que se oculten los input

import RegisterForm from '../../components/Account/RegisterForms'

export default function Register(){
    return(
        <KeyboardAwareScrollView>
            <Image source={require('../../../assets/img/img3.png')}
                resizeMode='contain'
                style={styles.logo}
             />
             <View style={styles.ViewForm}>
                <RegisterForm />
             </View>
            
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