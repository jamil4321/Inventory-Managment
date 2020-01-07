// DB Object

const dbInit = () =>{
    let firebaseConfig = {
        apiKey: "AIzaSyCyLp7RFkTWgnd6RzciepR3WfHI8L_PBK0",
        authDomain: "inventory-management-19e98.firebaseapp.com",
        databaseURL: "https://inventory-management-19e98.firebaseio.com",
        projectId: "inventory-management-19e98",
        storageBucket: "inventory-management-19e98.appspot.com",
        messagingSenderId: "638201903644",
        appId: "1:638201903644:web:64950fd84190c2f1a5bdd9"
      };
      firebase.initializeApp(firebaseConfig);
}
dbInit()



// Initilaize db variable
const db = firebase.database();