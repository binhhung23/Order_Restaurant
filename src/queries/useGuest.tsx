import guestApiRequests from "@/apiRequests/guest";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGuestOrderMutation = () => {
  return useMutation({
    mutationFn: guestApiRequests.order,
  });
};

export const useGetOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: guestApiRequests.getOrderList,
  });
};
