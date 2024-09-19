import guestApiRequests from "@/apiRequests/guest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGuestGetOrderListQuery = () => {
  return useQuery({
    queryFn: guestApiRequests.getOrderList,
    queryKey: ["guest-orders"],
  });
};
