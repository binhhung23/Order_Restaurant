import authApiRequests from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequests.cLogin,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequests.cLogout,
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: authApiRequests.sRefreshToken,
  });
};
