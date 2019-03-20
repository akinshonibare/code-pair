import firebase from "firebase/app";
import "firebase/auth";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDUMCwUCgkZCf4Dec5QQByW2pk3qdTTnmk",
    authDomain: "code-pair-ec2c8.firebaseapp.com",
    databaseURL: "https://code-pair-ec2c8.firebaseio.com",
    projectId: "code-pair-ec2c8",
    storageBucket: "code-pair-ec2c8.appspot.com",
    messagingSenderId: "930776554345"
};
firebase.initializeApp(FIREBASE_CONFIG);

export const firebaseAuth = firebase.auth();
export const GITHUB_AUTH_PROVIDER = new firebase.auth.GithubAuthProvider();