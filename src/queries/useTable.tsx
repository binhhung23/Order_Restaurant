import tableApiRequests from "@/apiRequests/table";
import { UpdateTableBodyType } from "@/schemaValidations/table.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTableListQuery = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: tableApiRequests.getListTable,
  });
};

export const useTableQuery = ({
  number,
  enabled,
}: {
  number: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["table", number],
    queryFn: () => tableApiRequests.getTable(number),
    enabled,
  });
};

export const useAddTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tableApiRequests.addTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      number,
      ...body
    }: { number: number } & UpdateTableBodyType) =>
      tableApiRequests.updateTable(number, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};

export const useDeleteTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tableApiRequests.deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};
