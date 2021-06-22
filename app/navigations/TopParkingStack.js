import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopParkings from '../screens/TopParkings'

const Stack = createStackNavigator();
export default function TopParkingStack() {
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
                name='top-parkings'
                component={TopParkings}
                options={
                    { title: 'Top-Parqueaderos' }
                }
            />
        </Stack.Navigator>
    );
}
