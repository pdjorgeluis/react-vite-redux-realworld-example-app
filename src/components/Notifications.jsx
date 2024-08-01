import React from "react";

function Notification({ error }) {
  if (!error) {
    return null;
  }
  const errorType = Object.keys(error.response.data.errors);
  const messages = Object.values(error.response.data.errors);

  return (
    <ul className="error-messages">
      {messages.map((message) => (
        <li>
          {errorType} {message}
        </li>
      ))}
    </ul>
  );
}

export default Notification;
