import http from "@/lib/http";
import {
  AccountListResType,
  AccountResType,
  CreateEmployeeAccountBodyType,
  CreateGuestBodyType,
  CreateGuestResType,
  GetGuestListQueryParamsType,
  GetListGuestsResType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import queryString from "query-string";

const accountApiRequests = {
  me: () => http.get<AccountResType>("/accounts/me"),
  updateme: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),
  list: () => http.get<AccountListResType>("/accounts"),
  addEmployee: (body: CreateEmployeeAccountBodyType) =>
    http.post<AccountResType>("/accounts", body),
  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) =>
    http.put<AccountResType>(`/accounts/detail/${id}`, body),
  deleteEmployee: (id: number) =>
    http.delete<AccountResType>(`/accounts/detail/${id}`),
  getEmployee: (id: number) =>
    http.get<AccountResType>(`/accounts/detail/${id}`),
  guestList: (qeryParams: GetGuestListQueryParamsType) =>
    http.get<GetListGuestsResType>(
      `/accounts/guests?` +
        queryString.stringify({
          fromDate: qeryParams.fromDate?.toISOString(),
          toDate: qeryParams.toDate?.toISOString(),
        })
    ),
  createGuest: (body: CreateGuestBodyType) =>
    http.post<CreateGuestResType>("/accounts/guests", body),
};

export default accountApiRequests;
