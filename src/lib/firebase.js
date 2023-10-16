import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDZEp1MpmXdmY6TkckQjnK_dw3nhh2UELw",
    authDomain: "instagram-bc424.firebaseapp.com",
    projectId: "instagram-bc424",
    storageBucket: "instagram-bc424.appspot.com",
    messagingSenderId: "998847646051",
    appId: "1:998847646051:web:2db3febb1b5a2b2b3c6b56"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;



export {firebase, FieldValue};