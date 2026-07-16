// Resources ====================================================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

// Hooks ================================================
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Types ====================================================
export interface headerprops {
    name: string,
    active: number,
    invites: string[];
}

export default function Header({ name, active, invites }: headerprops) {
    const [list, setList] = useState(false);

    return (
        <header className="w-full h-auto p-3 bg-gray-800 text-white flex items-center justify-between flex-wrap gap-2">
            <p className="text-2xl"><b>{name}</b></p>

            <div className="relative">
                <p className="lg font-bold cursor-pointer">Activos: {active}
                    <FontAwesomeIcon icon={faAngleDown} onClick={
                        () => { setList((prev) => !prev); }
                    }></FontAwesomeIcon>
                </p>

                <AnimatePresence mode="wait">
                    {list && (
                        <motion.ul className="absolute top-[130%] z-20 rounded-lg bg-gray-700/60 p-3 pb-4 right-0 w-40 flex flex-col gap-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {
                                invites.map((item, index) => (
                                    <li key={index}>
                                        <p className="mb-1 font-bold">{item}</p>
                                        <hr />
                                    </li>
                                ))
                            }
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}