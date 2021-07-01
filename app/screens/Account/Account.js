import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

//------------------------------
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

import * as firebase from 'firebase';

export default function Account() {

    const [Login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    // si el usuario retonar null significa que a un esta en tiempo de carga por ello no es false o true
    if (Login === null) return <Loading isVisible={true} text='cargando...' />


    return Login ? <UserLogged /> : <UserGuest />

}
