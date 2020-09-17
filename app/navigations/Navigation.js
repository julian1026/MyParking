import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements'
//trayendo los screen 

import AccountStack from './AccountStack';
import FavoriteStack from './FavoriteStack';
import ParkingStack  from './ParkingStack';
import TopParkingStack from './TopParkingStack';
import UbicationStack from './UbicationStack';

const Tab =createBottomTabNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='ubication' // app inicie en el boton restaurants
                tabBarOptions={{   // se controla los colores del tabBar
                    inactiveTintColor:'#070707',//color general tabOptin
                    activeTintColor:'#00A680',//color especifico
                }}

                // en esta parte cargo la funcion que me permitira cargar iconos
                screenOptions={({route})=>({
                    tabBarIcon:({color})=>screenOptions(route, color),
                })}
            >
                
                <Tab.Screen
                    name='ubication'
                    component={UbicationStack}
                    options={{title:"Ubicacion"}}
                 />

                 <Tab.Screen 
                    name='favorites'
                    component={FavoriteStack}
                    options={{title:"Favoritos"}}
                 />

                 <Tab.Screen
                    name='parkings'
                    component={ParkingStack}
                    options={{title:"Parqueaderos"}}
                  />

                <Tab.Screen
                    name='top-parkings'
                    component={TopParkingStack}
                    options={{title:"Top-5"}}
                 />

                <Tab.Screen
                    name='accounts'
                    component={AccountStack}
                    options={{title:"Cuenta"}}
                />


            </Tab.Navigator>
        </NavigationContainer>
    );
    
}

//funcion donde cargo icon dependiendo del  tabBoton
function screenOptions(route,color){
    let iconName;
    switch (route.name) {
        case 'ubication':
            iconName='compass-outline'  
            break;

        case 'favorites':
            iconName='heart-outline'
            break;

        case 'parkings':
            iconName='magnify'
            break;

        case 'top-parkings':
            iconName='star-outline'
            break;

        case 'accounts':
            iconName='home-outline'
            break;

        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={22} color={color} />
    )
}



