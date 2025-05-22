import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuNtgGZJoPNjlQUzHpSSbwwRU61lcOKyU",
    authDomain: "tpf-pk-a4840.firebaseapp.com",
    projectId: "tpf-pk-a4840",
    storageBucket: "tpf-pk-a4840.firebasestorage.app",
    messagingSenderId: "581616267396",
    appId: "1:581616267396:web:62c5dc4bd8596ffdcfd2d1",
    measurementId: "G-6T69X8M6PS"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
   signInWithPopup(auth, provider).then((result) => {
       const user = result.user;
       console.log(user);
   }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
   })
}

const userSignOut = async () => {
   signOut(auth).then(() => {
       alert("You have been signed out!")
   }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
   })
}

onAuthStateChanged(auth, (user) => {
   if (user) {
        alert("You are authenticated with Google");
        console.log(user);

        const fullName = user.displayName || "";
        const [firstName, lastName] = fullName.split(" ").filter(Boolean);

        document.getElementById("firstName").value = firstName || "";
        document.getElementById("lastName").value = lastName || "";
        document.getElementById("exampleInputEmail1").value = user.email || "";
   }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);