import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import AddParkingForm from '../../components/Parkings2/AddParkingForm'


export default function AddParking2(props) {
    const { navigation } = props;
    const [isLoading, setIsloading] = useState(false);
    const toastRef = useRef();
    return (
        <View>
            <AddParkingForm
                toastRef={toastRef}
                setIsloading={setIsloading}
                navigation={navigation}
            />

            <Toast ref={toastRef} position="center" opacity={0.9} />

            <Loading isVisible={isLoading} text="Creando Parqueadero" />
        </View>
    )
}



