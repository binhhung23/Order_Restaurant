"use client";

import { useAppContext } from "@/components/app-provider";
import {
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuh";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function Logout() {
  const { mutateAsync } = useLogoutMutation();
  const { setRole } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const ref = useRef<any>(null);
  useEffect(() => {
    if (
      !ref.current &&
      ((refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenLocalStorage()) ||
        (accessTokenFromUrl &&
          accessTokenFromUrl === getAccessTokenLocalStorage()))
    ) {
      ref.current = mutateAsync;
      mutateAsync().then((res) => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);
        setRole(undefined);
        router.push("/login");
      });
    } else {
      router.push("/");
    }
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl, setRole]);
  return <div>Logout page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Logout />
    </Suspense>
  );
}
