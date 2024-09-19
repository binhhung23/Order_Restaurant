import orderApiRequests from "@/apiRequests/order";
import {
  GetOrdersQueryParamsType,
  PayGuestOrdersBodyType,
  UpdateOrderBodyType,
} from "@/schemaValidations/order.schema";
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

export const useGetOrderListQuery = (queryParams: GetOrdersQueryParamsType) => {
  return useQuery({
    queryFn: () => orderApiRequests.getOrderList(queryParams),
    queryKey: ["orders", queryParams],
  });
};

export const useGetOrderDetailQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryFn: () => orderApiRequests.getOrderDetail(id),
    queryKey: ["orders", id],
    enabled,
  });
};

export const usePayForGuestMutation = () => {
  return useMutation({
    mutationFn: (body: PayGuestOrdersBodyType) => orderApiRequests.pay(body),
  });
};
