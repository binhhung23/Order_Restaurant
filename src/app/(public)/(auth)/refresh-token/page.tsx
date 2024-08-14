"use client";

import { checkAndRefreshToken, getRefreshTokenLocalStorage } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshTokenPage() {
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
    }
  }, [router, refreshTokenFromUrl, redirectUrl]);
  return <div>refreshToken</div>;
}
