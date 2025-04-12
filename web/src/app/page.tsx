'use client'

import {useBetterSignAndExecuteTransaction, useMediaSize} from "@/hooks";
import "@/app/page.css"
import {RefreshCw} from "lucide-react";
import {CustomSuiButton, Waiting} from "@/components";
import {newGameTx} from "@/libs/contracts";
import {ChangeEvent, useContext, useState} from "react";
import {UserContext} from "@/contexts";

export default function Home() {
    const [width, height] = useMediaSize();
    const userInfo = useContext(UserContext);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [inputSteps, setInputSteps] = useState<string>("");

    const changeInputSteps = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value;
        for (let i = 0; i < amount.length; i++) {
            const num = amount[i];
            if (num < '0' || num > '9')
                return;
        }
        let i = 0;
        while (i < amount.length && amount[i] === '0')
            i = i + 1;
        const finalAmount = i < amount.length ? amount.slice(i) : '';
        setInputSteps(finalAmount);
    }

    const canBuySteps = () => {
        return userInfo.account && inputSteps && userInfo.gp && Number(inputSteps) <= Number(userInfo.gp);
    }

    const {handleSignAndExecuteTransaction: handleNewGame} = useBetterSignAndExecuteTransaction({
        tx: newGameTx,
        waitForTx: true,
    });
    const handleClickNewGame = async () => {
        if (!userInfo.account || !userInfo.canAddNewGame || isWaiting)
            return;
        await handleNewGame({
            nftID: userInfo.nftID,
            sender: userInfo.account
        }).beforeExecute(() => {
            setIsWaiting(true);
        }).onError(err => {
            console.error(err);
            setIsWaiting(false);
        }).onSuccess(() => {
            userInfo.refreshInfo();
            setIsWaiting(false);
        }).onExecute();
    }

    return (
        <div style={{
            position: 'relative',
            width: `${width}px`,
            height: `${height}px`,
            minWidth: "1280px",
            minHeight: "720px"
        }}>
            <div className="absolute w-full h-full border border-blue-600 rounded-full opacity-20 -z-50 overflow-hidden">
                <div className="fixed w-full h-full animate-move">
                    <div className="w-full h-full bg-[url(/BlackSquid-Removebg.png)] bg-contain bg-no-repeat bg-center animate-rotate"></div>
                </div>
            </div>
            <div className="absolute w-[960px] h-[540px] 2xl:w-[1280px] 2xl:h-[720px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="w-full h-full border-2 border-[#0a0e0f]">
                    <iframe src="http://192.168.31.189:7456" className="w-full h-full"></iframe>
                </div>
                {/* left */}
                {/*<div className="fixed w-28 h-full border-2 border-[#0a0e0f] top-0 -left-36 flex flex-col justify-center gap-6 items-center">*/}
                {/*    <span>NewGame</span>*/}
                {/*    <span>BuySteps</span>*/}
                {/*</div>*/}
                {/* right */}
                <div className="fixed w-28 h-full border-2 border-[#0a0e0f] top-0 -right-36 flex flex-col justify-center gap-6 items-center">
                    <div className="flex flex-col gap-2 items-center mb-6">
                        <div className="flex gap-2 items-center">
                            <CustomSuiButton />
                            <RefreshCw
                                className="cursor-pointer text-[#196ae3] hover:text-[#35aaf7]"
                                size={12}
                                onClick={userInfo.refreshInfo}
                            />
                        </div>
                        <hr className="w-full border-[#041f4b]" />
                    </div>
                    <span className="cursor-pointer text-[#196ae3] hover:text-[#35aaf7]">Market</span>
                    <span className={userInfo.canAddNewGame ? "cursor-pointer text-[#196ae3] hover:text-[#35aaf7]" : "text-[#afb3b5]"} onClick={handleClickNewGame}>NewGame</span>
                    <div className="flex flex-col gap-1 items-center">
                        <input className="w-full font-bold focus:outline-none text-center px-1" placeholder="input steps" value={inputSteps} onChange={changeInputSteps}/>
                        <span className={canBuySteps() ? "cursor-pointer text-[#196ae3] hover:text-[#35aaf7]" : "text-[#afb3b5]"}>BuySteps</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-xs text-[#afb3b5]">
                        <span>GP: {userInfo.gp}</span>
                        <span>Steps: {userInfo.steps}</span>
                    </div>
                </div>
            </div>
            {isWaiting && <Waiting />}
        </div>
    );
}
