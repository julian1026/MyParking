import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Parkings2 from '../screens/parkings2/parkings2'
import AddParkings2 from '../screens/parkings2/addParking2'
import Parking2 from '../screens/parkings2/parking2'
import AddReviewParking from '../screens/parkings2/addReviewParking'

const Stack = createStackNavigator();

export default function ParkingStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#008080',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name='parkings2'
                component={Parkings2}
                options={{
                    title: 'Parqueaderos del Sistema'
                }}
            />
            <Stack.Screen
                name='addParqueaderos2'
                component={AddParkings2}
                options={{
                    title: 'Agregar Parqueadero'
                }}
            />
            <Stack.Screen
                name='parking2'
                component={Parking2}
            />
            <Stack.Screen
                name='addReviewParking'
                component={AddReviewParking}
                options={{ title: "Nuevo Comentario" }}
            />
        </Stack.Navigator>
    );
}