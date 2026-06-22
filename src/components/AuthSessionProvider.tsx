"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  AUTH_SESSION_EXPIRED_EVENT,
  AuthSessionExpiredDetail,
  hasStoredAuthToken,
  isTokenExpiredAuthError,
  triggerAuthSessionExpired,
} from "@/lib/auth-session";

type AuthSessionProviderProps = {
  children: React.ReactNode;
};

function readAuthErrorPayload(responseData: unknown) {
  if (!responseData || typeof responseData !== "object") {
    return null;
  }

  return responseData;
}

function readExpiredMessage(payload: unknown) {
  if (payload && typeof payload === "object" && "error" in payload) {
    return String((payload as { error?: string }).error || "Your session expired. Please log in again.");
  }

  return "Your session expired. Please log in again.";
}

export default function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const router = useRouter();

  useEffect(() => {
    const handleAuthExpired = (event: Event) => {
      const customEvent = event as CustomEvent<AuthSessionExpiredDetail>;
      const message = customEvent.detail?.message;
      const redirectTo = customEvent.detail?.redirectTo ?? "/";

      toast.error(message || "Your session expired. Please log in again.");
      router.replace(redirectTo);
    };

    window.addEventListener(
      AUTH_SESSION_EXPIRED_EVENT,
      handleAuthExpired as EventListener,
    );

    return () => {
      window.removeEventListener(
        AUTH_SESSION_EXPIRED_EVENT,
        handleAuthExpired as EventListener,
      );
    };
  }, [router]);

  useEffect(() => {
    const handleAxiosResponseError = (error: any) => {
      const payload = readAuthErrorPayload(error?.response?.data);

      if (hasStoredAuthToken() && isTokenExpiredAuthError(payload)) {
        triggerAuthSessionExpired(readExpiredMessage(payload));
      }

      return Promise.reject(error);
    };

    const axiosInterceptorId = axios.interceptors.response.use(
      (response) => response,
      handleAxiosResponseError,
    );

    const apiInterceptorId = api.interceptors.response.use(
      (response) => response,
      handleAxiosResponseError,
    );

    const originalFetch = window.fetch.bind(window);

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (!response.ok && hasStoredAuthToken()) {
        try {
          const clonedResponse = response.clone();
          const contentType = clonedResponse.headers.get("content-type") || "";
          let payload: unknown = null;

          if (contentType.includes("application/json")) {
            payload = await clonedResponse.json();
          } else {
            const text = await clonedResponse.text();

            try {
              payload = JSON.parse(text);
            } catch {
              payload = null;
            }
          }

          if (isTokenExpiredAuthError(payload)) {
            triggerAuthSessionExpired(readExpiredMessage(payload));
          }
        } catch {
          // Ignore parsing errors and return the original response unchanged.
        }
      }

      return response;
    };

    return () => {
      axios.interceptors.response.eject(axiosInterceptorId);
      api.interceptors.response.eject(apiInterceptorId);
      window.fetch = originalFetch;
    };
  }, []);

  return children;
}
