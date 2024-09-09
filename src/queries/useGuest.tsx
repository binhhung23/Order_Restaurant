import guestApiRequests from "@/apiRequests/guest";
import { useMutation } from "@tanstack/react-query";

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: guestApiRequests.cLogin,
  });
};

export const useGuestLogoutMutation = () => {
  return useMutation({
    mutationFn: guestApiRequests.cLogout,
  });
};

export const useGuestRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: guestApiRequests.sRefreshToken,
  });
};
