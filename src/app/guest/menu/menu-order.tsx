"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useGetDishList } from "@/queries/useDish";
import Quantity from "@/app/guest/menu/quantity";
import { GuestCreateOrdersBodyType } from "@/schemaValidations/guest.schema";
import { useMemo, useState } from "react";

export default function MenuOrder() {
  const { data } = useGetDishList();
  const dishes = useMemo(() => data?.payload.data ?? [], [data]);
  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([]);
  const totalPrice = useMemo(() => {
    return dishes.reduce((result, dish) => {
      const order = orders.find((order) => order.dishId === dish.id);
      if (!order) {
        return result;
      }
      return result + dish.price * order.quantity;
    }, 0);
  }, [orders, dishes]);

  const handleQuantityChange = (dishId: number, quantity: number) => {
    setOrders((prevOrders) => {
      if (quantity === 0) {
        return prevOrders.filter((orders) => orders.dishId !== dishId);
      }
      const index = prevOrders.findIndex((orders) => orders.dishId === dishId);
      if (index === -1) {
        return [...prevOrders, { dishId, quantity }];
      }
      const newOrders = [...prevOrders];
      newOrders[index] = { ...newOrders[index], quantity };
      return newOrders;
    });
  };
  return (
    <>
      <div className="max-w-[400px] mx-auto space-y-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={dish.image}
                alt={dish.name}
                height={100}
                width={100}
                quality={100}
                className="object-cover w-[80px] h-[80px] rounded-md"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">{dish.name}</h3>
              <p className="text-xs">{dish.description}</p>
              <p className="text-xs font-semibold">
                {formatCurrency(dish.price)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-auto flex justify-center items-center">
              <Quantity
                onChange={(value) => handleQuantityChange(dish.id, value)}
                value={
                  orders.find((orders) => orders.dishId === dish.id)
                    ?.quantity ?? 0
                }
              />
            </div>
          </div>
        ))}
        <div className="sticky bottom-0">
          <Button className="w-full justify-between">
            <span>Giỏ hàng · {orders.length}</span>
            <span>{formatCurrency(totalPrice)}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
