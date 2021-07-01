import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { map } from 'lodash';
import Modal from "../modal"


import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';



export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUseInfo } = props;
    const [showModal, setShowModal] = useState(true);

    /* esta constante es la encargada de rendrizar que componente se muestra en el modal */
    const [renderComponent, setRenderComponent] = useState(null);

    // console.log(userInfo);
    /*dependiendo del valor que trae la variable se ejecutara una accion*/
    const selectComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUseInfo={setReloadUseInfo}
                    />);
                setShowModal(true);

                break;

            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUseInfo={setReloadUseInfo}
                    />
                );
                setShowModal(true);

                break;

            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />);
                setShowModal(true);

                break;

            default:
                setRenderComponent(null);
                setShowModal(false);

                break;
        }
    }
    const menuOptions = generateOptions(selectComponent);
    // console.log(menuOptions);

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,

                    }}
                    containerStyle={styles.menuItems}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent && (

                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}
                >
                    {renderComponent}
                </Modal>
            )}
        </View>
    );
}
//esta funcion contiene una lista de objetos que renderizara  el list item
function generateOptions(selectComponent) {
    return [
        {
            title: "Cambiar Nombres y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayName"),
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("email"),
        },
        {
            title: "Cambiar Contrasena",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("password"),
        }
    ]
}

const styles = StyleSheet.create({
    menuItems: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    }
});
