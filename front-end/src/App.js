// import logo from "./logo.svg";
import "./App.css";

import GoogleLoginButton from "./components/GoogleLogin";

import { useEffect, useState } from "react";
import GitHubSignIn from "./components/GithubLogin";
import Main from "./pages/Main";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      // second
    };
  }, [loggedIn]);

  return (
    <div className="App">
      <GoogleLoginButton
        isLoggedIn={setLoggedIn}
        setEmail={setEmail}
        setImageUrl={setImageUrl}
        setName={setName}
      />
      <GitHubSignIn
        isLoggedIn={setLoggedIn}
        setEmail={setEmail}
        setImageUrl={setImageUrl}
        setName={setName}
      />

      {loggedIn ? <Main name={name} email={email} imageUrl={imageUrl} /> : null}
    </div>
  );
}

export default App;
