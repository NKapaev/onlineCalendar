import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import Button from "../ui/button/Button";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/mainpage");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Button
      onClick={() => {
        handleGoogleLogin();
      }}
      variant="secondary"
      icon="./icons/google.svg#google"
      iconStroke="none"
    >
      Continue with Google
    </Button>
  );
};

export default Login;
