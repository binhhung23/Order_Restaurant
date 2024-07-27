import authApiRequests from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: authApiRequests.cLogin,
  });
};
