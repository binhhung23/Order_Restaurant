import guestApiRequests from "@/apiRequests/guest";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "Không nhận được accessToken hoặc refreshToken",
      },
      {
        status: 200,
      }
    );
  }
  try {
    const result = await guestApiRequests.sLogout({
      accessToken,
      refreshToken,
    });
    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      {
        message: "Lỗi khi gọi Api đến server backend",
      },
      {
        status: 200,
      }
    );
  }
}
