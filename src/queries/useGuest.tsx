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

export const useGetGuestOrderListQuery = () => {
  return useQuery({
    queryKey: ["guest-orders"],
    queryFn: guestApiRequests.getOrderList,
  });
};

export const useGuestOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: guestApiRequests.order,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["guest-orders"],
      });
    },
  });
};
