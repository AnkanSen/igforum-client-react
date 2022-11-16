import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

// import { ToastContainer, toast } from "react-toastify";

const setToken = async (res) => {
  try {
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      {
        params: { id_token: `${res.credential}` },
      }
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: `${googleRes.data.email}`,
          isOrganization: true,
        }
      );

      localStorage.setItem("x-auth-token", response.data.accessToken);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = async (res) => {
    try {
      await setToken(res);
      navigate("/");
    } catch (err) {
      redirect("/login");
    }
  };

  const onError = (err) => console.log(err);

  useEffect(() => {
    async function verify() {
      try {
        const verifyToken = await axios.get(
          "http://localhost:5000/api/verify",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("x-auth-token")}`,
            },
          }
        );
        navigate("/");
      } catch (err) {
        redirect("/login");
      }
    }
    verify();
  }, []);

  return (
    <div>
      <h1>Welcome To IG Forum Organization Panel</h1>
      <br></br>
      <p> Sign In</p>
      <GoogleOAuthProvider clientId="686237414426-i403mqs4n53kj8n3e7m59nobp91dks41.apps.googleusercontent.com">
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
