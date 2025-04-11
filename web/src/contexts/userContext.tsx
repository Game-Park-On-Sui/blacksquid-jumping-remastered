'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import {useCurrentAccount, useResolveSuiNSName} from "@mysten/dapp-kit";
import {getNFTID} from "@/libs/contracts";

type UserInfoType = {
    account: string | null | undefined,
    suiName: string | null | undefined,
    accountLabel: string | null | undefined,
    nftID: string | null | undefined,
}

export const UserContext = createContext<UserInfoType>({
    account: undefined,
    suiName: undefined,
    accountLabel: undefined,
    nftID: undefined
});

export default function UserContextProvider({children}: {children: ReactNode}) {
    const account = useCurrentAccount();
    const {data: suiName} = useResolveSuiNSName(account?.address);
    const [nftID, setNftID] = useState<string | null | undefined>(undefined);
    useEffect(() => {
        getNFTID(account?.address, null).then(nftID => setNftID(nftID));
    }, [account]);

    return (
        <UserContext.Provider value={{
            account: account?.address,
            suiName,
            accountLabel: account?.label,
            nftID
        }}>
            {children}
        </UserContext.Provider>
    );
}