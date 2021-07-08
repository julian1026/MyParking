import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';


import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import { set } from 'lodash';
import AccountOptions from '../../components/Account/AccountOptions';

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setloading] = useState(false);
    const toastRef = useRef();
    const [loadigText, setLoadigText] = useState('');
    const [reloadUseInfo, setReloadUseInfo] = useState(false);


    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })()
        setReloadUseInfo(false);

    },
        [reloadUseInfo])

    return (
        <View style={styles.viewUserInfo} >
            {userInfo && <InfoUser
                userInfo={userInfo}
                toastRef={toastRef}
                setloading={setloading}
                setLoadigText={setLoadigText} />}

            {/* <Text>AccountOptions...</Text> */}
            <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setReloadUseInfo={setReloadUseInfo}
            />


            <Button
                title='Cerrar Session'
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position='center' opacity={0.9} />
            <Loading text={loadigText} isVisible={loading} />

        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'

    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnCloseSessionText: {
        color: '#00a680',
    }
})