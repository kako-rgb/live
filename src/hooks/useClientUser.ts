import { useSession } from "next-auth/react";

export default function useClientUser() {
    const { data }: any = useSession();
    let user = data?.user
    return user;
}