"use client";

import {
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
    const checkAndRefreshToken = async () => {
      const refreshToken = getRefreshTokenLocalStorage();
      const accessToken = getAccessTokenLocalStorage();
      if (!refreshToken || !accessToken) return;
      const decodedAccessToken = jwt.decode(accessToken) as {
        exp: number;
        iat: number;
      };
      const decodedRefreshToken = jwt.decode(refreshToken) as {
        exp: number;
        iat: number;
      };
      // thời điểm hết hạn của token tính theo epoch time (s)
      // còn khi dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time (ms)
      const now = Math.round(new Date().getTime() / 1000);
      if (decodedRefreshToken.exp <= now) return;

      // kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
      if (
        decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
      ) {
        // Gọi API refresh token
        try {
          console.log(1);
          const res = await authApiRequests.cRefreshToken();
          setAccessTokenToLocalStorage(res.payload.data.accessToken);
          setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
        } catch (error) {
          clearInterval(interval);
        }
      }
    };
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TimeOut
    checkAndRefreshToken();
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
