const db = firebase.database();
function addUser() {
  let userId = db
    .ref()
    .child("posts")
    .push().key;
  let userName = document.getElementById("userName").value;
  let userPass = document.getElementById("userPass").value;
  //   userPass = calcSHA1(userPass);
  db.ref("users/" + userId).set({
    userName: userName,
    userPass: userPass
  });
}
var cokie;
function login() {
  let userName = document.getElementById("userName").value.toLowerCase();
  let userPass = document.getElementById("userPass").value;
  let flag = false;
  let users = [];
  db.ref("users/").on("value", function(snapshot) {
    // console.log(snapshot.val())
    users = Object.values(snapshot.val());
    for (var i = 0; i < users.length; i++) {
      if (users[i].userName === userName && users[i].userPass === userPass) {
        flag = true;
        cokie = document.cookie = "userName = " +userName; 
      }
    }
    if (flag) {
        location.pathname = "/index.html";
    } else {
      let alert = document.getElementById("alert");
      alert.innerHTML = `This is a danger alert—check it out!`;
      setTimeout(()=>alert.innerHTML="",3000)
    }
  });
}
// if(!cokie){
//     console.log(body,cokie)
//   }else{
//     body.innerHTML="Kindly Login First"

//     location.pathname ="/Login.html"
//   }

function logout(){
  document.cookie = "userName = ;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}

