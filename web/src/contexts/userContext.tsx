'use client'

import {createContext, ReactNode} from "react";
import {useCurrentAccount, useResolveSuiNSName} from "@mysten/dapp-kit";

type UserInfoType = {
    account: string | null | undefined,
    suiName: string | null | undefined,
    accountLabel: string | null | undefined,
}

export const UserContext = createContext<UserInfoType>({
    account: undefined,
    suiName: undefined,
    accountLabel: undefined,
});

export default function UserContextProvider({children}: {children: ReactNode}) {
    const account = useCurrentAccount();
    const {data: suiName} = useResolveSuiNSName(account?.address);

    return (
        <UserContext.Provider value={{
            account: account?.address,
            suiName,
            accountLabel: account?.label,
        }}>
            {children}
        </UserContext.Provider>
    );
}