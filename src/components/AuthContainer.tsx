"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";

export default function AuthContainer() {
  const [view, setView] = useState<"login" | "signup" | "success">("login");

  if (view === "login") {
    return (
      <AuthForm
        type="login"
        onSwitch={() => setView("signup")}
        onSuccess={() => setView("success")}
      />
    );
  }

  if (view === "signup") {
    return (
      <AuthForm
        type="signup"
        onSwitch={() => setView("login")}
        onSuccess={() => setView("success")}
      />
    );
  }

  return <AuthSuccess />;
}