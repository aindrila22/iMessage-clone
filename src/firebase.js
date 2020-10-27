import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD5LWc2NluvVLlcxXciqvni_1ucjt-IXh0",
    authDomain: "imessagec-7f479.firebaseapp.com",
    databaseURL: "https://imessagec-7f479.firebaseio.com",
    projectId: "imessagec-7f479",
    storageBucket: "imessagec-7f479.appspot.com",
    messagingSenderId: "922599208946",
    appId: "1:922599208946:web:e4273ea057ffeda0f39d6b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
   
  export { auth, provider };
  export default db;