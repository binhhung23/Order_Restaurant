import dishApiRequests from "@/apiRequests/dish";
import { UpdateDishBodyType } from "@/schemaValidations/dish.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDishListQuery = () => {
  return useQuery({
    queryKey: ["dishs"],
    queryFn: dishApiRequests.list,
  });
};

export const useAddDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dishApiRequests.addDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishs"],
      });
    },
  });
};

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & UpdateDishBodyType) =>
      dishApiRequests.updateDish(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishs"],
        exact: true,
      });
    },
  });
};

export const useGetDish = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["dish", id],
    queryFn: () => dishApiRequests.getDish(id),
    enabled,
  });
};

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dishApiRequests.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishs"],
      });
    },
  });
};
