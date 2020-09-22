import React from 'react'
import {View, StyleSheet} from 'react-native'

import {Input, Icon, Button} from 'react-native-elements'

export default function RegisterForm(){
    return(
        <View style={styles.containerFirst}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
             />
            <Input
                placeholder='contrasena'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
             />
            <Input
                placeholder='repetir contrasena'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
             />
             <Button
             title='Unirse'
             buttonStyle={[styles.BtnStyle]}
             containerStyle={styles.btnRegister}
              />
        </View>
    );
}

const styles=StyleSheet.create({
    containerFirst:{
        // flex:1,
        // alignItems:'center',
        // justifyContent:'center',
         marginTop:30
    },
    inputForm:{
        width:'100%',
        marginTop:10
    },
    btnRegister:{
        marginTop:20,
        width:'95%'
    },
    BtnStyle:{
        backgroundColor:'#00a680',
    }
})