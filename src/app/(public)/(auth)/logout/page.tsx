"use client";

import { getRefreshTokenLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuh";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LogoutPage() {
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const ref = useRef<any>(null);
  useEffect(() => {
    if (ref.current || refreshTokenFromUrl !== getRefreshTokenLocalStorage())
      return;
    ref.current = mutateAsync;
    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null;
      }, 1000);
      router.push("/login");
    });
  }, [mutateAsync, router, refreshTokenFromUrl]);
  return <div>page</div>;
}
