import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Parkings2 from '../screens/parkings2/parkings2'
import AddParkings2 from '../screens/parkings2/addParking2'

const Stack = createStackNavigator();

export default function ParkingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='parkings2'
                component={Parkings2}
                options={{
                    title: 'Parqueaderos2'
                }}
            />
            <Stack.Screen
                name='addParqueaderos2'
                component={AddParkings2}
                options={{
                    title: 'Agregar Parqueadero'
                }}
            />
        </Stack.Navigator>
    );
}