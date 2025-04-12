'use client'

import useAxios from "@/hooks/useAxios"
import useVendorStore from "@/store/vendor-store"
import { USER } from "@/utils/types"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

const RoleRedirect = ({ children, user, token }: { children: ReactNode, user: USER, token?: any }) => {

    const { replace } = useRouter();

    const { setStore, store } = useVendorStore();

    const request = useAxios(token)

    const getVendorStore = async () => {
        try {
            const response = await request({
                method: 'get',
                path: '/vendor/account'
            });
            setStore(response.data.store)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user) {
            if (user.role === 'Vendor') {
                replace('/dashboard/vendor');
                if (!store) getVendorStore();
            }
            else if (user.role === 'Admin') replace('/dashboard/admin')
            else replace('/dashboard/customer')
        }
    }, [user])

  return children
}

export default RoleRedirect