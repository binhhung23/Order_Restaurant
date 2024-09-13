"use client";

import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import socket from "@/lib/socket";
import { formatCurrency, getVietnameseOrderStatus } from "@/lib/utils";
import { useGetGuestOrderListQuery } from "@/queries/useGuest";
import { UpdateOrderResType } from "@/schemaValidations/order.schema";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export default function OrderCart() {
  const { data, refetch } = useGetGuestOrderListQuery();
  const orders = useMemo(() => data?.payload.data ?? [], [data]);
  const totalPrice = useMemo(() => {
    return orders.reduce((result, order) => {
      return result + order.dishSnapshot.price * order.quantity;
    }, 0);
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

    socket.on("update-order", onUpdateOrder);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update-order", onUpdateOrder);
    };
  }, []);

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
          <span>Tổng Cộng · {orders.length} món</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </>
  );
}
