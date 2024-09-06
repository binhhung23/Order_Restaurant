import http from "@/lib/http";
import {
  CreateDishBodyType,
  DishListResType,
  DishResType,
  UpdateDishBodyType,
} from "@/schemaValidations/dish.schema";

const dishApiRequests = {
  list: () => http.get<DishListResType>("/dishes", { cache: "no-store" }),
  addDish: (body: CreateDishBodyType) =>
    http.post<DishResType>("/dishes", body),
  updateDish: (id: number, body: UpdateDishBodyType) =>
    http.put<DishResType>(`/dishes/${id}`, body),
  getDish: (id: number) => http.get<DishResType>(`/dishes/${id}`),
  deleteDish: (id: number) => http.delete<DishResType>(`/dishes/${id}`),
};

export default dishApiRequests;
