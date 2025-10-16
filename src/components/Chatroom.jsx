import { useState, useEffect, useRef } from "react";

import { addMessage, fetchMessages } from "../utils";
import { Message } from "./Message";

export default function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const inputRef=useRef()
  const messagesEndRef = useRef();

  useEffect(() => {
  const unsubscribe = fetchMessages(setMessages); // elindítjuk a figyelőt
  return unsubscribe; // cleanup: leállítjuk, amikor a komponens eltűnik
}, []);


  useEffect(() => {//minden alkalommal, amikor a messages state változik, automatikusan legörgeti a chat ablakot az utolsó üzenethez.
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });//Sima, animált görgetést ad, nem hirtelen ugrást.
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      text:inputRef.current.value,
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      timestamp: Date.now(),
    };
    await addMessage(message);
    };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} currentUid={user.uid} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <input ref={inputRef}  placeholder="Írj valamit..." />
        <button type="submit">Küldés</button>
      </form>
    </div>
  );
}
