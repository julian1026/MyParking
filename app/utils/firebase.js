import firebase from 'firebase/app'

const firebaseConfig={
    apiKey: "AIzaSyDVxmEYNKGLfP2v32cyvxtK8TSf6TmR-3s",
    authDomain: "myparking-987f9.firebaseapp.com",
    databaseURL: "https://myparking-987f9.firebaseio.com",
    projectId: "myparking-987f9",
    storageBucket: "myparking-987f9.appspot.com",
    messagingSenderId: "858688706614",
    appId: "1:858688706614:web:442020a1457a743d246097",
    measurementId: "G-KNKXR5CXN5"
}
export const firebaseApp=firebase.initializeApp(firebaseConfig);