"use client";
import React, { useState } from "react";
import LoginSection from "./loginSection";
import SignupSection from "./signupSection";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  if (isLogin) {
    return <LoginSection onSwitchToSignup={switchToSignup} />;
  } else {
    return <SignupSection onSwitchToLogin={switchToLogin} />;
  }
};

export default AuthContainer;
