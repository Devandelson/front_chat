import type { ButtonHTMLAttributes } from "react";

export function Button1({title, style, ...extend }: 
{title: string, style?: string} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="submit"
            className={`w-max py-2.5 rounded-lg bg-[#D9A441] text-[#0E1613] font-semibold text-sm hover:bg-[#E5B563] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#142220] transition px-5 ${style}`}
            {...extend}
        >
            {title}
        </button>
    )
}