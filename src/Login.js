import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
  const auth = getAuth();
  const [{}, dispatch] = useStateValue();
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://www.logoai.com/uploads/output/2022/03/01/7d475a83b9a09ef249a5940d649e3589.jpg?t=1646186387"
          alt=""
        />
        <div className="login_text">
          <h2>Sign in to Lets Chat</h2>
        </div>
        <Button onClick={signIn} variant="contained">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
