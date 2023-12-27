import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDbp_3b8NBUnpG18ehjiOmt9neNDPcqL9w",
    authDomain: "mini-project-1f72d.firebaseapp.com",
    projectId: "mini-project-1f72d",
    storageBucket: "mini-project-1f72d.appspot.com",
    messagingSenderId: "679951451679",
    appId: "1:679951451679:web:ebf34805bc75d9832b772a",
    measurementId: "G-9T0JZ2FLZV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
