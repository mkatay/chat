import { addDoc, collection, onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from "./firebaseApp";

export const fetchMessages = (setMessages) => {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("timestamp")); // időrend szerint
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messagesArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messagesArr);
  });
  return unsubscribe; //Az onSnapshot visszaad egy függvényt, ami leállítja a figyelőt.
};

export const addMessage = async (message) => {
  try {
    const docRef=collection(db, "messages")
    await addDoc(docRef, message);// Üzenet hozzáadása a Firestore "messages" kollekciójához
  } catch (err) {
    console.error("Hiba üzenet küldéskor:", err);
  }
};
