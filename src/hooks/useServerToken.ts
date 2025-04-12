import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

export default function useServerToken() {
  return getServerSession(authOptions).then((session: any) => {
    let token = session?.user?.token;
    return token;
  });
}

export function getServerToken() {
  return getServerSession(authOptions).then((session: any) => {
    let token = session?.user?.token;
    return token;
  });
}

export function userServerUser() {
  return getServerSession(authOptions).then((session: any) => {
    return session?.user
  })
}