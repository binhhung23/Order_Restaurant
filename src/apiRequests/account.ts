import http from "@/lib/http";
import {
  AccountListResType,
  AccountResType,
  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequests = {
  me: () => http.get<AccountResType>("/accounts/me"),
  updateme: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),
  list: () => http.get<AccountListResType>("/accounts"),
  addEmployee: (body: CreateEmployeeAccountBodyType) =>
    http.post<AccountResType>("/accounts", body),
  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) =>
    http.put<AccountResType>(`/accounts/details/${id}`, body),
  deleteEmployee: (id: number) =>
    http.delete<AccountResType>(`/accounts/details/${id}`),
  getEmployee: (id: number) =>
    http.get<AccountResType>(`/accounts/details/${id}`),
};

export default accountApiRequests;
