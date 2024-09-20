import accountApiRequests from "@/apiRequests/account";
import {
  CreateEmployeeAccountBodyType,
  GetGuestListQueryParamsType,
  UpdateEmployeeAccountBodyType,
} from "@/schemaValidations/account.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetAccountList = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountApiRequests.list,
  });
};

export const useGetAccount = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => accountApiRequests.getEmployee(id),
    enabled,
  });
};

export const useAddAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequests.addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: { id: number } & UpdateEmployeeAccountBodyType) =>
      accountApiRequests.updateEmployee(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        exact: true,
      });
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequests.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useGetGuestListQuery = (
  queryParams: GetGuestListQueryParamsType
) => {
  return useQuery({
    queryFn: () => accountApiRequests.guestList(queryParams),
    queryKey: ["guests", queryParams],
  });
};

export const useCreateGuestMutation = () => {
  return useMutation({
    mutationFn: accountApiRequests.createGuest,
  });
};
