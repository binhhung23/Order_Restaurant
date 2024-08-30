import http from "@/lib/http";
import {
  CreateTableBodyType,
  TableListResType,
  TableResType,
  UpdateTableBodyType,
} from "@/schemaValidations/table.schema";

const tableApiRequests = {
  getListTable: () => http.get<TableListResType>("/tables"),
  getTable: (number: number) => http.get<TableResType>(`/tables/${number}`),
  addTable: (body: CreateTableBodyType) =>
    http.post<TableResType>("/tables", body),
  updateTable: (number: number, body: UpdateTableBodyType) =>
    http.put<TableResType>(`/tables/${number}`, body),
  deleteTable: (number: number) =>
    http.delete<TableResType>(`/tables/${number}`),
};

export default tableApiRequests;
