import React from "react";

function Main({ name, email, imageUrl }) {
  return (
    <div>
      <h1>Hey {name}</h1>
      <p>{email}</p>
      <img src={imageUrl} alt="profile"/>
    </div>
  );
}

export default Main;
