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
import { ArrowLeft, ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

type ForgotPasswordFlowProps = {
  onBackToLogin: () => void;
  onSuccess?: () => void;
};

type Step = "email" | "otp" | "reset";

function extractToken(data: unknown) {
  if (!data) {
    return null;
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object") {
    const payload = data as {
      token?: string;
      data?: { token?: string } | string;
    };

    if (payload.token) {
      return payload.token;
    }

    if (typeof payload.data === "string") {
      return payload.data;
    }

    if (payload.data && typeof payload.data === "object" && payload.data.token) {
      return payload.data.token;
    }
  }

  return null;
}

function resolveErrorMessage(err: unknown, fallback: string) {
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
}

function formatTimer(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function ForgotPasswordFlow({ onBackToLogin, onSuccess }: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const sendOtpEndpoint = process.env.NEXT_PUBLIC_FORGOT_PASSWORD_SEND_OTP_ENDPOINT;
  const verifyOtpEndpoint = process.env.NEXT_PUBLIC_FORGOT_PASSWORD_VERIFY_OTP_ENDPOINT;
  const resetEndpoint = process.env.NEXT_PUBLIC_FORGOT_PASSWORD_RESET_ENDPOINT;

  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setResendTimer((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [step, resendTimer]);

  const storeToken = (token: string) => {
    Cookies.set("token", token, { expires: 7, path: "/" });
    localStorage.setItem("token", token);
  };

  const focusOtpInput = (index: number) => {
    otpInputRefs.current[index]?.focus();
  };

  const resetOtpFields = () => {
    setOtpDigits(["", "", "", "", "", ""]);
    setResendTimer(60);
  };

  const sendOtp = async () => {
    if (!sendOtpEndpoint) {
      throw new Error("NEXT_PUBLIC_FORGOT_PASSWORD_SEND_OTP_ENDPOINT is not defined");
    }

    const response = await axios.post(sendOtpEndpoint, { email });
    return response.data;
  };

  const verifyOtp = async () => {
    if (!verifyOtpEndpoint) {
      throw new Error("NEXT_PUBLIC_FORGOT_PASSWORD_VERIFY_OTP_ENDPOINT is not defined");
    }

    const response = await axios.post(verifyOtpEndpoint, {
      email,
      otp: otpDigits.join(""),
    });

    return response.data;
  };

  const resetPassword = async () => {
    if (!resetEndpoint) {
      throw new Error("NEXT_PUBLIC_FORGOT_PASSWORD_RESET_ENDPOINT is not defined");
    }

    const response = await axios.post(resetEndpoint, {
      email,
      token: resetToken,
      newPassword,
      confirmPassword,
    });

    return response.data;
  };

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await sendOtp();
      resetOtpFields();
      setStep("otp");
      setInfo(`OTP sent to ${email}`);
      window.setTimeout(() => focusOtpInput(0), 0);
    } catch (err) {
      setError(resolveErrorMessage(err, "Unable to send OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (otpDigits.some((digit) => !digit)) {
        throw new Error("Please enter the full 6-digit OTP");
      }

      const data = await verifyOtp();
      const token = extractToken(data);

      if (!token) {
        throw new Error("Reset token not received");
      }

      setResetToken(token);
      setStep("reset");
    } catch (err) {
      setError(resolveErrorMessage(err, "OTP verification failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const data = await resetPassword();
      const token = extractToken(data?.data ?? data);

      if (token) {
        storeToken(token);
      }

      onSuccess?.();
    } catch (err) {
      setError(resolveErrorMessage(err, "Password reset failed"));
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
    setInfo("");
    setResendingOtp(true);

    try {
      await sendOtp();
      resetOtpFields();
      setInfo(`OTP resent to ${email}`);
      window.setTimeout(() => focusOtpInput(0), 0);
    } catch (err) {
      setError(resolveErrorMessage(err, "Unable to resend OTP"));
    } finally {
      setResendingOtp(false);
    }
  };

  const heading = {
    email: "Reset your password",
    otp: `Enter the OTP sent to ${email}`,
    reset: "Create a new password",
  }[step];

  const subtitle = {
    email: "We’ll send a code to your email to confirm it’s you.",
    otp: "Enter the 6-digit code to continue.",
    reset: "Choose a new password to finish resetting your account.",
  }[step];

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                onChange={(event) => setEmail(event.target.value)}
                placeholder="hello@example.com"
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Continue"}
            <ArrowRight size={18} />
          </motion.button>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to login
            </button>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {otpDigits.map((digit, index) => (
              <input
                key={`forgot-otp-${index}`}
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
              {resendingOtp ? "Resending..." : resendTimer > 0 ? `Resend in ${formatTimer(resendTimer)}` : "Resend OTP"}
            </button>
          </div>

          {info && <p className="text-sm text-primary text-center">{info}</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || otpDigits.some((digit) => !digit)}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
            <ArrowRight size={18} />
          </motion.button>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setError("");
                setInfo("");
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Change email
            </button>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                size={18}
              />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>

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
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Updating password..." : "Reset Password"}
            <ArrowRight size={18} />
          </motion.button>
        </form>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 px-4 py-3">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <p className="text-sm text-muted-foreground">
          Use the same email for all steps. Once reset, you will be logged in automatically.
        </p>
      </div>
    </div>
  );
}