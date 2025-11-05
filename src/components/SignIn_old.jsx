/*
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseApp";


export default function SignIn() {

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="signin">
      <p>Jelentkezz be, hogy chatelhess!</p>
      <button onClick={handleSignIn}>Bejelentkezés Google-fiókkal</button>
    </div>
  );
}
*/
import { useEffect } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseApp";

export default function SignIn() {
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Bejelentkezett:", result.user);
        }
      })
      .catch((err) => console.error("Auth error:", err));
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  return (
    <div className="signin">
      <p>Jelentkezz be, hogy chatelhess!</p>
      <button onClick={handleSignIn}>Bejelentkezés Google-fiókkal</button>
    </div>
  );
}
