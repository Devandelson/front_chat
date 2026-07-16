// Resources ====================================================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons"
import { type ChatProps } from '../../../utils/infoChat.tsx';
import handleDeleteMessage from '../utils/deleteData.tsx';

import { motion, type Variants } from "motion/react";

interface MessageProps {
    name: string,
    text: string,
    direction?: 'left' | 'right',
    chat: ChatProps,
    indexMessage: number,
    admin: boolean,
    animate: Variants
}

export default function Message(dataProps: MessageProps) {
    const { name, text, direction = 'left', chat, indexMessage, admin, animate } = dataProps;

    const direct = direction == 'right' ? 'items-end!' : '';
    const directBody = direction == 'right' ? 'justify-start! flex-row-reverse!' : '';
    const userActives = String(localStorage.getItem('userName'));

    return (
        chat.conversations[indexMessage] && (
            <motion.section className={`w-full flex flex-col h-auto ${direct}`}
                variants={animate}
            >
                <p className="text-white font-bold text-lg">Usuario: <b>{name}</b></p>
                <div className={`w-full h-auto flex items-start gap-3 ${direct} ${directBody}`}>
                    <div className={`w-full h-auto p-3 rounded-sm bg-white/20 text-white mt-3 max-w-120 ${direction == 'left' ? 'bg-blue-400/50!' : ''}`}>
                        {text}
                    </div>
                    <div className="py-4">
                        {admin && (
                            <button className="text-red-500 font-bold text-lg hover:scale-110 hover:text-red-600 cursor-pointer" onClick={
                                (e) => { e.preventDefault(); handleDeleteMessage({ chat: chat, indexMessage: indexMessage, name: userActives }) }}>
                                <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
                            </button>
                        )}
                    </div>
                </div>
            </motion.section>
        )
    )
}