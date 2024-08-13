import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/schemaValidations/auth.schema";

const authApiRequests = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  sLogout: (body: LogoutBodyType & { accessToken: string }) =>
    http.post(
      "/auth/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  cLogout: () => http.post("/api/auth/logout", null, { baseUrl: "" }),
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/auth/refresh-token", body),
  cRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/api/auth/refresh-token", null, {
      baseUrl: "",
    }),
};

export default authApiRequests;
