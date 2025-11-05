
import { useState } from 'react';
import './App.css'
import { auth } from './firebaseApp';
import ChatRoom from './components/Chatroom';
import {SignIn} from './components/SignIn';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';

function App() {
 const [user, setUser] = useState(null);
console.log(user);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return unsub;
  }, []);

  return (
    <div className="app">
      <h1>🔥 RealChat</h1>
      {user ? (
         <>
          <div className="user-info">
            <img src={user.photoURL} alt={user.displayName} />
            <span>{user.displayName}</span>
            <button onClick={() => signOut(auth)}>Kijelentkezés</button>
          </div>
          <ChatRoom user={user} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App
