import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Ubication(){
    return(
        <View   style={styles.container}>
            <Text>Ubication</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
       alignItems:'center' 
    }
})