import React from "react";

function Notification({ messages }) {
  if (!messages) {
    return null;
  }

  return (
    <ul className="error-messages">
      {messages.map((message) => (
        <li>{message}</li>
      ))}
    </ul>
  );
}

export default Notification;
