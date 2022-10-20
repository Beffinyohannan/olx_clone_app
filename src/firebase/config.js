import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC08goPWJE8kH6WfinAowZPbbHcXYz2ros",
    authDomain: "fir-8bf53.firebaseapp.com",
    projectId: "fir-8bf53",
    storageBucket: "fir-8bf53.appspot.com",
    messagingSenderId: "521870104501",
    appId: "1:521870104501:web:fed99b8a667e49d8b82bfc",
    measurementId: "G-E3QCC24FF6"
  };

  export default firebase.initializeApp(firebaseConfig)