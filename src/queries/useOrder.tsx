import orderApiRequests from "@/apiRequests/order";
import { UpdateOrderBodyType } from "@/schemaValidations/order.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: ({
      orderId,
      ...body
    }: UpdateOrderBodyType & {
      orderId: number;
    }) => orderApiRequests.updateOrder(orderId, body),
  });
};

export const useGetOrderListQuery = () => {
  return useQuery({
    queryFn: orderApiRequests.getOrderList,
    queryKey: ["orders"],
  });
};
