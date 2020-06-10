import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyARH-K7nA69lW1CX5DpWmtxnkJ_T2XvUx4',
  authDomain: 'knowple-4ec8e.firebaseapp.com',
  databaseURL: 'https://knowple-4ec8e.firebaseio.com',
  projectId: 'knowple-4ec8e',
  storageBucket: 'knowple-4ec8e.appspot.com',
  messagingSenderId: '329722277766',
  appId: '1:329722277766:web:ef3e61b59031da0d3c4607',
  measurementId: 'G-71BFT6Z20Q'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup Google auth provider
const provider = new firebase.auth.GoogleAuthProvider();

// Pass params to provider to always trigger the Google auth provider pop-up
provider.setCustomParameters({ prompt: 'select_account' });
// TODO: Create providers for Twitter and Facebook
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// Just in case we want the whole library
export default firebase;
