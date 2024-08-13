"use client";
import { useRefreshTokenMutation } from "@/queries/useAuh";

export default function page() {
  const { mutateAsync } = useRefreshTokenMutation();
  return <div>page</div>;
}
