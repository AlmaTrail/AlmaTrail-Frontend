"use client";

import { useState } from "react";
import LoginSection from "./loginSection";
import SignupSection from "./signupSection";
import AuthSuccess from "./AuthSuccess";

export default function AuthContainer() {
  const [view, setView] = useState<"login" | "signup" | "success">("login");

  if (view === "login") {
    return (
      <LoginSection
        onSwitch={() => setView("signup")}
        onSuccess={() => setView("success")}
      />
    );
  }

  if (view === "signup") {
    return (
      <SignupSection
        onSwitch={() => setView("login")}
        onSuccess={() => setView("success")}
      />
    );
  }

  return <AuthSuccess />;
}