import accountApiRequests from "@/apiRequests/account";
import { useQuery } from "@tanstack/react-query";

export const useAccountProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: accountApiRequests.me,
  });
};
