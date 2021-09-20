// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
  apiKey: "AIzaSyA7T912hi4I4EdRE0FDHGddpQu9D4UQWSs",
  authDomain: "fir-blog-2af03.firebaseapp.com",
  databaseURL: "https://fir-blog-2af03-default-rtdb.firebaseio.com",
  projectId: "fir-blog-2af03",
  storageBucket: "fir-blog-2af03.appspot.com",
  messagingSenderId: "661961356189",
  appId: "1:661961356189:web:2aa1f2d34878a02ff5b574",
  measurementId: "G-CVNT6L9B4V"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signIn() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {

      window.location = 'Homepage.html';

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);

    });
}

//Sign in function using email and password
// function signIn(){

//     var email = document.getElementById("email");
//     var password = document.getElementById("password");

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email.value, password.value)
//       .then((res) => {

//         window.location = 'Homepage.html';

//         }
//       ).catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert(errorMessage);

//     });
// }

//Sign up new user using email and password
function signUp() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var userName = document.getElementById("userName");

  //user created with name, email & pwd
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {

      const user = firebase.auth().currentUser;

      //updating new user's-- basic info
      //name given undefined if not updated
      if (user != null) {
        user.updateProfile({
          displayName: userName.value
        }).then(() => {
          window.location = 'Homepage.html';
        }).catch((error) => {
          console.log(error);
        });
      } else {
        alert("Could not sign up.");
      }

    }).catch(function (error) {
      var errorMessage = error.message;
      alert(errorMessage);

    });

}

//Google sign in 
function googleSignInPopup() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      alert("Successfully signed in with Google.")
      window.location = 'Homepage.html';
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
      alert("Login using Google failed.")
    });
  // [END auth_google_signin_popup]
}