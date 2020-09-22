import React from 'react'
import {View, Text, ScrollView,Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {Divider} from 'react-native-elements'


export default function Login(){
    
    return(
        <ScrollView>
            <Image
                source={require('../../../assets/img/img3.png')}
                style={styles.logo}
                resizeMode='contain'
             />
             <View style={styles.viewContainer}>
                 <Text>iniciar session</Text>
                 <CreateAccounts />
             </View>

             <Divider style={styles.Divider} />

                <Text>Social Media</Text>

        </ScrollView>
             
    );
}

function CreateAccounts(){
    const navigation=useNavigation();
    return(
        <Text style={styles.textRegistrate}>
            A un no tienes una cuenta?
            <Text
                style={styles.btnRegister}
                onPress={()=>navigation.navigate('register')}
            >
                 Registrate
            </Text>
        </Text>
        
    );
}

const styles=StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:10
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
    },
    textRegistrate:{
        marginLeft:40,
        marginRight:40,
        marginTop:15
    },
    btnRegister:{
        color:'#40e0d0',
        fontWeight:'bold'
    },
    Divider:{
        margin:40,
        backgroundColor:'#00a680'
    }
})