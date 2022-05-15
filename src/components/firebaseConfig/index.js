import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, onValue} from 'firebase/database';

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyB_wZYxDe_ZRXtCBFqJjmGdNorAVif7dC0",
        authDomain: "contact-list-6c7bc.firebaseapp.com",
        projectId: "contact-list-6c7bc",
        storageBucket: "contact-list-6c7bc.appspot.com",
        messagingSenderId: "865500306038",
        appId: "1:865500306038:web:edc32ee22b57c12cf09d57",
        measurementId: "G-RP6RZS3MR8"
      };
      
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);
}

export default StartFirebase;

/*
function writeUserData(userId, name, email) {
  const db = getDatabase(app);
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

const usersRef = ref(database, 'users/');
var d;
onValue(usersRef, (snapshot) => {
  d = snapshot.val();
  console.log(d);
});

writeUserData(5, "oowwaa", "test@gmail.com");
*/

