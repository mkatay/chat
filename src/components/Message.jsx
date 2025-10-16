import React from "react";

export const Message=({ msg, currentUid })=> {
  const isOwn = msg.uid === currentUid;
  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <img src={msg.photoURL} alt="avatar" />
      <div>
        <strong>{msg.displayName}</strong>
        <p>{msg.text}</p>
      </div>
    </div>
  );
}
