"use client";

import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { OrderStatus } from "@/constants/type";
import socket from "@/lib/socket";
import { formatCurrency, getVietnameseOrderStatus } from "@/lib/utils";
import { useGuestGetOrderListQuery } from "@/queries/useGuest";
import {
  PayGuestOrdersResType,
  UpdateOrderResType,
} from "@/schemaValidations/order.schema";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export default function OrderCart() {
  const { data, refetch } = useGuestGetOrderListQuery();
  const orders = useMemo(() => data?.payload.data ?? [], [data]);
  const { unpaid, paid } = useMemo(() => {
    return orders.reduce(
      (result, order) => {
        if (
          order.status === OrderStatus.Delivered ||
          order.status === OrderStatus.Pending ||
          order.status === OrderStatus.Processing
        ) {
          return {
            ...result,
            unpaid: {
              price:
                result.unpaid.price + order.dishSnapshot.price * order.quantity,
              quantity: result.unpaid.quantity + order.quantity,
            },
          };
        }
        if (order.status === OrderStatus.Paid) {
          return {
            ...result,
            paid: {
              price:
                result.paid.price + order.dishSnapshot.price * order.quantity,
              quantity: result.paid.quantity + order.quantity,
            },
          };
        }
        return result;
      },
      {
        unpaid: {
          price: 0,
          quantity: 0,
        },
        paid: {
          price: 0,
          quantity: 0,
        },
      }
    );
  }, [orders]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket.id);
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    function onUpdateOrder(data: UpdateOrderResType["data"]) {
      const {
        dishSnapshot: { name },
        status,
      } = data;
      toast({
        description: `Món ${name} ${getVietnameseOrderStatus(status)}`,
      });
      refetch();
    }

    function onPayment(data: PayGuestOrdersResType["data"]) {
      const { guest } = data[0];
      toast({
        description: `${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`,
      });
      refetch();
    }

    socket.on("update-order", onUpdateOrder);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("payment", onPayment);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("payment", onPayment);
      socket.off("update-order", onUpdateOrder);
    };
  }, [refetch]);

  return (
    <>
      {orders.map((order, index) => (
        <div key={order.id} className="flex gap-4">
          <span className="w-4 h-4">{index + 1}</span>
          <div className="flex-shrink-0">
            <Image
              src={order.dishSnapshot.image}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className="object-cover w-[80px] h-[80px] rounded-md"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm">{order.dishSnapshot.name}</h3>
            <div className="text-xs font-semibold">
              {formatCurrency(order.dishSnapshot.price)} x{" "}
              <Badge className="px-1">{order.quantity}</Badge>
            </div>
          </div>
          <div className="flex-shrink-0 ml-6 flex justify-center items-center ">
            <Badge variant={"outline"}>
              {getVietnameseOrderStatus(order.status)}
            </Badge>
          </div>
        </div>
      ))}
      <div className="sticky bottom-0">
        <div className="w-full justify-between text-xl font-semibold space-x-4">
          <span>Đơn chưa thanh toán · {unpaid.quantity} món</span>
          <span>{formatCurrency(unpaid.price)}</span>
        </div>
      </div>
      {paid.quantity !== 0 && (
        <div className="sticky bottom-0">
          <div className="w-full justify-between text-xl font-semibold space-x-4">
            <span>Đơn đã thanh toán · {paid.quantity} món</span>
            <span>{formatCurrency(paid.price)}</span>
          </div>
        </div>
      )}
    </>
  );
}
