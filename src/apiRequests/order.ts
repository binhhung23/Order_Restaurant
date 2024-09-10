import http from "@/lib/http";
import {
  GetOrdersResType,
  UpdateOrderBodyType,
  UpdateOrderResType,
} from "@/schemaValidations/order.schema";

const orderApiRequests = {
  getOrderList: () => http.get<GetOrdersResType>("/guest/orders"),
  updateOrder: (orderId: number, body: UpdateOrderBodyType) =>
    http.put<UpdateOrderResType>(`/guest/orders/${orderId}`, body),
};

export default orderApiRequests;
