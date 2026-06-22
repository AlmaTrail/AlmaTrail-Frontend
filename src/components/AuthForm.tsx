"use client";

import axios from "axios";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { googleLoginUser } from "@/services/authService";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

interface AuthFormProps {
  type: "login" | "signup";
  onSwitch: () => void;
  onSuccess?: () => void;
}

export default function AuthForm({ type, onSwitch, onSuccess }: AuthFormProps) {
  const [loginView, setLoginView] = useState<"form" | "forgot">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const verifyOtpEndpoint = process.env.NEXT_PUBLIC_VERIFY_OTP_ENDPOINT;
  const signupEndpoint = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT;
  const loginEndpoint = process.env.NEXT_PUBLIC_LOGIN_ENDPOINT;

  useEffect(() => {
    setLoginView("form");
  }, [type]);

  useEffect(() => {
    if (!otpStep || resendTimer <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setResendTimer((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [otpStep, resendTimer]);

  const storeToken = (token: string) => {
    Cookies.set("token", token, { expires: 7, path: "/" });
    localStorage.setItem("token", token);
  };

  const extractToken = (data: unknown) => {
    if (typeof data === "string") {
      return data;
    }

    if (data && typeof data === "object" && "token" in data) {
      return String((data as { token?: string }).token || "");
    }

    return null;
  };

  const resolveErrorMessage = (err: unknown, fallback: string) => {
    if (axios.isAxiosError(err)) {
      const payload = err.response?.data;

      if (typeof payload === "string") {
        return payload;
      }

      if (payload && typeof payload === "object" && "message" in payload) {
        return String((payload as { message?: string }).message || fallback);
      }

      return err.message || fallback;
    }

    if (err instanceof Error) {
      return err.message || fallback;
    }

    if (typeof err === "string") {
      return err;
    }

    return fallback;
  };

  const focusOtpInput = (index: number) => {
    otpInputRefs.current[index]?.focus();
  };

  const resetOtpState = () => {
    setOtpStep(false);
    setOtpDigits(["", "", "", "", "", ""]);
    setResendTimer(60);
    setError("");
  };

  const startOtpStep = () => {
    setOtpStep(true);
    setOtpDigits(["", "", "", "", "", ""]);
    setResendTimer(60);
    window.setTimeout(() => focusOtpInput(0), 0);
  };

  const sendSignupOtp = async () => {
    if (!signupEndpoint) {
      throw new Error("NEXT_PUBLIC_SIGNUP_ENDPOINT is not defined");
    }

    const response = await axios.post(signupEndpoint, {
      email,
      password,
    });

    return response.data;
  };

  const verifyOtp = async () => {
    if (!verifyOtpEndpoint) {
      throw new Error("NEXT_PUBLIC_VERIFY_OTP_ENDPOINT is not defined");
    }

    const response = await axios.post(verifyOtpEndpoint, {
      email,
      otp: otpDigits.join(""),
    });

    return response.data;
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;

    setError("");
    setLoading(true);

    try {
      const data = await googleLoginUser(credentialResponse.credential);
      const token = extractToken(data);

      if (!token) {
        throw new Error("Token not found in response");
      }

      storeToken(token);
      onSuccess?.();
    } catch (err) {
      setError(resolveErrorMessage(err, "Google authentication failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === "signup" && !otpStep && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (type === "login") {
        if (!loginEndpoint) {
          throw new Error("NEXT_PUBLIC_LOGIN_ENDPOINT is not defined");
        }

        const response = await axios.post(loginEndpoint, {
          email,
          password,
        });

        const token = extractToken(response.data);

        if (!token) {
          throw new Error("Token not received");
        }

        storeToken(token);
        onSuccess?.();
        return;
      }

      if (!otpStep) {
        await sendSignupOtp();
        startOtpStep();
        return;
      }

      if (otpDigits.some((digit) => !digit)) {
        throw new Error("Please enter the full 6-digit OTP");
      }

      const response = await verifyOtp();
      const token = extractToken(response);

      if (token) {
        storeToken(token);
      }

      resetOtpState();
      onSuccess?.();
    } catch (err) {
      setError(resolveErrorMessage(err, "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/\D/g, "").slice(-1);

    setOtpDigits((current) => {
      const nextDigits = [...current];
      nextDigits[index] = nextValue;
      return nextDigits;
    });

    if (nextValue && index < 5) {
      focusOtpInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      focusOtpInput(index - 1);
    }
  };

  const handleOtpPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const digits = pastedValue.split("");

    setOtpDigits([
      digits[0] || "",
      digits[1] || "",
      digits[2] || "",
      digits[3] || "",
      digits[4] || "",
      digits[5] || "",
    ]);

    focusOtpInput(Math.min(digits.length, 5));
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || resendingOtp) {
      return;
    }

    setError("");
    setResendingOtp(true);

    try {
      await sendSignupOtp();
      setOtpDigits(["", "", "", "", "", ""]);
      setResendTimer(60);
      window.setTimeout(() => focusOtpInput(0), 0);
    } catch (err) {
      setError(resolveErrorMessage(err, "Unable to resend OTP"));
    } finally {
      setResendingOtp(false);
    }
  };

  const otpCode = otpDigits.join("");

  const heading = (() => {
    if (type === "login") {
      return {
        title: "Welcome back",
        subtitle: "Sign in to continue your journey",
      };
    }

    if (otpStep) {
      return {
        title: `Please enter the OTP shared on ${email || "your email"}`,
        subtitle: "",
      };
    }

    return {
      title: "Create your account",
      subtitle: "Start connecting with mentors",
    };
  })();

  if (type === "login" && loginView === "forgot") {
    return (
      <ForgotPasswordFlow
        onBackToLogin={() => setLoginView("form")}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{heading.title}</h2>
        <p className="text-sm text-muted-foreground">{heading.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!otpStep && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            </div>

            {type === "signup" && (
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    size={18}
                  />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {otpStep && (
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {otpDigits.map((digit, index) => (
                <input
                  key={`otp-${index}`}
                  ref={(node) => {
                    otpInputRefs.current[index] = node;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={handleOtpChange(index)}
                  onKeyDown={handleOtpKeyDown(index)}
                  onPaste={handleOtpPaste}
                  className="h-12 rounded-xl border border-border bg-background text-center text-lg font-semibold tracking-[0.2em] text-foreground shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">Didn&apos;t receive it?</div>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || resendingOtp}
                className="text-sm font-medium text-primary transition disabled:cursor-not-allowed disabled:text-muted-foreground"
              >
                {resendingOtp
                  ? "Resending..."
                  : resendTimer > 0
                    ? `Resend in ${String(Math.floor(resendTimer / 60)).padStart(2, "0")}:${String(resendTimer % 60).padStart(2, "0")}`
                    : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        {type === "login" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setLoginView("forgot")}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || (otpStep && otpCode.length !== 6)}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
        >
          {loading
            ? type === "login"
              ? "Signing in..."
              : otpStep
                ? "Verifying OTP..."
                : "Sending OTP..."
            : type === "login"
              ? "Sign In"
              : otpStep
                ? "Verify OTP"
                : "Create Account"}
          <ArrowRight size={18} />
        </motion.button>

        {type === "login" ? (
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitch} className="text-primary font-medium hover:underline">
              Sign up
            </button>
          </p>
        ) : !otpStep ? (
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button type="button" onClick={onSwitch} className="text-primary font-medium hover:underline">
              Sign in
            </button>
          </p>
        ) : null}
      </form>

      {!(type === "signup" && otpStep) && (
        <>
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="w-full mt-1">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
              width="330"
              shape="pill"
              size="large"
              text={type === "login" ? "signin_with" : "signup_with"}
              containerProps={{ className: "w-full max-w-[330px] mx-auto" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
