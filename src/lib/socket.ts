import envConfig from "@/config";
import { getAccessTokenLocalStorage } from "@/lib/utils";
import { io } from "socket.io-client";

const socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
  auth: {
    Authorization: `Bearer ${getAccessTokenLocalStorage()}`,
  },
});

export default socket;
