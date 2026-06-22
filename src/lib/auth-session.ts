import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY = "token";
export const AUTH_SESSION_EXPIRED_EVENT = "almatrail:auth-session-expired";

export interface AuthSessionExpiredDetail {
  message: string;
  redirectTo?: string;
}

type AuthErrorPayload = {
  status?: number;
  error?: string;
  errorCode?: string;
};

const DEFAULT_EXPIRED_MESSAGE = "Your session expired. Please log in again.";

export function hasStoredAuthToken() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(
    Cookies.get(AUTH_TOKEN_KEY) || window.localStorage.getItem(AUTH_TOKEN_KEY),
  );
}

export function clearStoredAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isTokenExpiredAuthError(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const errorPayload = payload as AuthErrorPayload;

  return (
    errorPayload.status === 401 &&
    errorPayload.errorCode === "TOKEN_EXPIRED"
  );
}

export function triggerAuthSessionExpired(message = DEFAULT_EXPIRED_MESSAGE) {
  if (typeof window === "undefined") {
    return;
  }

  clearStoredAuthSession();

  window.dispatchEvent(
    new CustomEvent<AuthSessionExpiredDetail>(AUTH_SESSION_EXPIRED_EVENT, {
      detail: {
        message,
        redirectTo: "/",
      },
    }),
  );
}
