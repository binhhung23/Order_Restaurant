"use client";

import {
  checkAndRefreshToken,
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import authApiRequests from "@/apiRequests/auth";

// Những path không check refresh token
const UNAUTHENTICATED_PATHS = ["/login", "/logout", "/refresh-token"];
export default function RefreshToken() {
  const pathname = usePathname();
  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) return;
    let interval: any = null;

    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TimeOut
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
      },
    });
    // Time out phải bé hơn thời gian hết hạn access token
    // nếu access token là 10s thì 1s mình check 1 lần
    const TIMEOUT = 1000;
    interval = setInterval(checkAndRefreshToken, TIMEOUT);
    return () => {
      clearInterval(interval);
    };
  }, [pathname]);
  return null;
}
