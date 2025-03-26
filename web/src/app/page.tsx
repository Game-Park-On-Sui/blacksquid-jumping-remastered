'use client'

import {useMediaSize} from "@/hooks";
import "@/app/page.css"

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
                <div className="w-full h-full border-2"></div>
                <div className="fixed w-28 h-full border-2 top-0 -left-36">
                    left
                </div>
                <div className="fixed w-28 h-full border-2 top-0 -right-36">
                    right
                </div>
            </div>
        </div>
    );
}
