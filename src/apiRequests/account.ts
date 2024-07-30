import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequests = {
  me: () => http.get<AccountResType>("/accounts/me"),
  updateme: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),
};

export default accountApiRequests;
