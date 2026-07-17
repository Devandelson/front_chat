// Resources ====================================================
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { type ChatProps } from '../../utils/infoChat.tsx';
import { handleSendMessage } from './utils/pushData.tsx';
import { motion, AnimatePresence, type Variants } from "motion/react";

// Components =================================================
import Header from './Components/header.tsx';
import Message from "./Components/Message.tsx";

// Hooks ======================================================
import { useState } from "react";

export default function Chat({ chat, users }: { chat: ChatProps, users: Array<string> }) {
    const [input, setInput] = useState<string>('');
    const userActives = localStorage.getItem('userName');

    const containerVariants: Variants = {
        initial: {
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2,
                staggerDirection: 1,
            },
        },
    };

    const contentVariants: Variants = {
        initial: {
            opacity: 0,
            y: 10
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };
    const activeUsers = users.length;

    function handleChangeInput(e: React.KeyboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const tecla = e.key;
        if (tecla === 'Enter') {
            handleSendMessage(
                String(userActives),
                input,
                setInput,
                chat
            );
        };
    }

    return (
        <section className="grid grid-rows-[auto_1fr_auto] bg-gray-900 border-6 border-gray-700 rounded-2xl overflow-hidden">
            <Header name={chat.name} active={activeUsers} invites={users}></Header>

            <motion.main className="p-6 overflow-y-auto flex flex-col gap-6"
                key={chat.name}
                initial="initial"
                animate="open"
                exit="initial"
                variants={containerVariants}
            >
                <AnimatePresence>
                    {chat.conversations.map((data, index) => {
                        const dataMessage = {
                            name: data.user,
                            text: data.text,
                            chat: chat,
                            indexMessage: index,
                            admin: data.user == String(userActives),
                            animate: contentVariants
                        };

                        return (
                            data.user == String(userActives) ? (
                                <Message key={index} {...dataMessage}></Message>
                            ) : (
                                <Message key={index} direction="right" {...dataMessage}></Message>
                            )
                        )
                    })}
                </AnimatePresence>
            </motion.main>


            <footer className="relative px-2">
                <div className="bg-gray-700 text-white p-3 rounded-t-xl flex items-center gap-2">
                    <input type="text" placeholder="Escribe..." className="w-full outline-none"
                        onKeyDown={(e) => {handleChangeInput(e)}}
                        value={input} onChange={(e) => setInput(e.target.value)}
                    />
                    <span className="h-5 w-0.5 bg-gray-600 block"></span>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleSendMessage(
                            String(userActives),
                            input,
                            setInput,
                            chat
                        );
                    }}>
                        <FontAwesomeIcon icon={faPaperPlane} className="hover:scale-150
                        hover:text-blue-500 cursor-pointer transition-all"></FontAwesomeIcon>
                    </button>
                </div>
            </footer>
        </section >
    )
}