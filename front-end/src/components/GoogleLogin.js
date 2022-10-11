import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const clientID =
  "1045686450940-ilbtp2uq3p9hfatvks19hd54ktc2m3fc.apps.googleusercontent.com";

function GoogleLoginButton({ isLoggedIn, setName, setImageUrl, setEmail }) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  // var accessToken = gapi.auth.getToken().access_token

  const onSuccess = (res) => {
    console.log("Login SUCCESS");
    const { name, email, imageUrl } = res.profileObj;
    const payload = {
      name,
      email,
      imageUrl,
    };
    axios
      .post("http://localhost:5000/api/v1/auth/google-login", payload)
      .then(
        res => {
          isLoggedIn(true)
          const {name ,email,imageUrl} = res.data
          setName(name)
          setEmail(email)
          setImageUrl(imageUrl)
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const onFailure = (res) => {
    console.log("Login FAILED: res", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleLoginButton;
