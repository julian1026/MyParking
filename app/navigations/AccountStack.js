import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//importando screen 

import Account from '../screens/Account/Account'
import Login from '../screens/Account/Login'
import Register from '../screens/Account/Register'

const Stack = createStackNavigator();

export default function AccountStack() {

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
                name="account"
                component={Account}
                options={{
                    title: 'Mi Cuenta'
                }}
            />

            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: 'Iniciar Sesion' }}
            />

            <Stack.Screen
                name='register'
                component={Register}
                options={{ title: 'Registrarse' }}
            />
        </Stack.Navigator>
    );

}