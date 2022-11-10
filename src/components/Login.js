import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import axios from "axios";

import { useEffect, useState } from "react";

async function loginSuccess(res) {
  console.log(res);
  axios
    .get("https://www.googleapis.com/oauth2/v1/tokeninfo", {
      params: { id_token: `${res.credential}` },
    })
    .then((google_res) => {
      if (google_res.status === 200) {
        axios
          .post("http://localhost:5000/api/auth/login", {
            email: `${google_res.data.email}`,
            isOrganization: true,
          })
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem(
                "x-auth-token",
                `${response.data.accessToken}`
              );
              window.location.reload(false);
              return 1;
            }
          });
      }
    })
    .catch((google_err) => {
      console.log(google_err);
    });
}

const loginFailure = (err) => {
  console.log(err);
};

const Login = () => {
  const navigate = useNavigate();

  const [loginMsg, setLoginMsg] = useState("");
  const [tokenVerify, setTokenVerify] = useState(false);

  useEffect(() => {
    try {
      tokenVerify();
    } catch (err) {
      console.log(err);
      setLoginMsg("[/login]: Server Error, Try logging in Again");
    }
  }, []);

  const onSuccess = (res) => {
    loginSuccess(res).then(navigate("/"));
  };

  return (
    <div>
      <h1>Welcome To IG Forum Organization Panel</h1>
      <p> Sign In</p>
      <h3>{loginMsg}</h3>
      <GoogleOAuthProvider clientId="686237414426-i403mqs4n53kj8n3e7m59nobp91dks41.apps.googleusercontent.com">
        <GoogleLogin onSuccess={onSuccess} onError={loginFailure} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
