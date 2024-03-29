import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Ubication from '../screens/Ubication/Ubication'

const Stack = createStackNavigator();

export default function UbicationStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#008080',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name='ubication'
                component={Ubication}
                options={
                    { title: 'Parqueaderos de la Zona' }
                }
            />
        </Stack.Navigator>
    );
}
