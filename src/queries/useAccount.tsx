import accountApiRequests from "@/apiRequests/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAccountMe = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: accountApiRequests.me,
  });
};

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequests.updateme,
  });
};
