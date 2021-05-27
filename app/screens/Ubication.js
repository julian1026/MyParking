import React from 'react';
import { ColorPropType } from 'react-native';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import Maps from '../components/Account/maps'
import Mapa2 from '../components/Account/mapa2'



export default function Ubication() {

    return (
        <Maps />
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})