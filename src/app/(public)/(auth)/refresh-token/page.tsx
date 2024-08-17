"use client";

import { checkAndRefreshToken, getRefreshTokenLocalStorage } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function RefreshToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl == getRefreshTokenLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectUrl || "/");
        },
      });
    } else {
      router.push("/");
    }
  }, [router, refreshTokenFromUrl, redirectUrl]);
  return <div>refreshToken page...</div>;
}

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RefreshToken />
    </Suspense>
  );
}
