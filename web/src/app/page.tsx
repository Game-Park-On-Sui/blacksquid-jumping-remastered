'use client'

import {useMediaSize} from "@/hooks";
import "@/app/page.css"
import {RefreshCw} from "lucide-react";
import {CustomSuiButton} from "@/components";

export default function Home() {
    const [width, height] = useMediaSize();

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
                <div className="w-full h-full border-2 border-[#0a0e0f]"></div>
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
                            />
                        </div>
                        <hr className="w-full border-[#041f4b]" />
                    </div>
                    <span className="cursor-pointer text-[#196ae3] hover:text-[#35aaf7]">Market</span>
                    <span className="cursor-pointer text-[#196ae3] hover:text-[#35aaf7]">NewGame</span>
                    <span className="cursor-pointer text-[#196ae3] hover:text-[#35aaf7]">BuySteps</span>
                    <div className="flex flex-col gap-2 items-center text-xs text-[#afb3b5]">
                        <span>GP: 1000000000</span>
                        <span>Steps: 1000000000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
