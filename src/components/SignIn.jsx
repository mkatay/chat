
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
