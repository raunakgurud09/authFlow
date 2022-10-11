import axios from "axios";

const gitHubClientId = "74117a69360e7fbfdabc";
const gitHubRedirectUri = "http://localhost:5000/api/v1/auth/github";

const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${gitHubClientId}&redirect_uri=${gitHubRedirectUri}?scope=user:email`;

export function GitHubSignIn({ isLoggedIn, setName, setImageUrl, setEmail }) {
  const handleSubmit = () => {
    console.log(gitHubUrl);
    axios
      .get(gitHubUrl, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
    // return result;
    isLoggedIn(true);
    // const { name, email, imageUrl } = res.data;
    // setName(name);
    // setEmail(email);
    // setImageUrl(imageUrl);
  };

  return (
    // <a href={gitHubUrl}>
    // </a>
    <button onClick={handleSubmit}>github</button>
  );
}

export default GitHubSignIn;
