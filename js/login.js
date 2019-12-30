
    let hash = calcSHA1('Jamil')
    console.log(hash)

    const db = firebase.database();

    function addUser() {
        let userId = db.ref().child('posts').push().key;
        let userName = document.getElementById('userName').value
        let userPass = document.getElementById('userPass').value
        userPass = calcSHA1(userPass)
        firebase.database().ref('users/' + userId).set({
          userName: userName,
          userPass: userPass,
        });
      }