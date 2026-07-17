// Resources ==============================================
import { motion, type Variants } from "motion/react";
import { type ChatProps } from '../../utils/infoChat.tsx';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// components =============================================
import Header from "./components/header.tsx";
import Controls from "./components/Controls.tsx";
import ListView from './components/ListView.tsx';

// Shared =============================================
import { Button1 } from '@shared/smallComponent.tsx';

// hooks =============================================
import { useState } from "react";


interface MenuProps {
    chat: ChatProps[]
    setChat: React.Dispatch<React.SetStateAction<ChatProps[]>>,
    users: Array<string>
}

function Menu({ chat, setChat, users }: MenuProps) {
    const navigate = useNavigate();

    const menuVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -15 // Empieza 15 píxeles a la izquierda
        },
        visible: {
            opacity: 1,
            x: 0,  // Se mueve a su posición original
            transition: {
                duration: 0.35, // Duración ideal para que se sienta rápido pero suave
                ease: "easeOut" // Empieza rápido y frena suavemente
            }
        }
    };

    const userName = String(localStorage.getItem('userName'));
    const Role = String(localStorage.getItem('role'));

    async function handleSingOut() {
        const route = await fetch('http://localhost:3000/api/login/logout', {
            method: 'GET'
        });
        const result = await route.json();

        if (result.status) {
            Swal.fire({
                title: result.message,
                icon: 'success'
            });
            localStorage.removeItem('userName');
            localStorage.removeItem('role');
            navigate('/');
        }
    }

    const styleRole = Role == 'admin' ? 'grid-rows-[repeat(4,auto)_1fr_auto]'
        : 'grid-rows-[repeat(3,auto)_1fr_auto]';
    const activeUsers = users.length;

    const [visibleMenu, setVisibleMenu] = useState(true);
    const styleMenu = visibleMenu ? 'max-md:max-w-0!' : 'max-w-87.5';
    const styleIcon = visibleMenu ? 'bg-red-950 -right-15' : 'bg-blue-950 right-5';

    return (
        <motion.div className={`h-screen relative bg-gray-700 w-full ${styleMenu} transition-all`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
        >
            <button className={`p-2 text-white absolute top-6 rounded-sm z-10
                hover:scale-110 active:scale-[0.95] transition-all duration-200 ${styleIcon}

                hidden max-md:block  
            `}
                onClick={() => { setVisibleMenu((prev) => !prev) }}
            >
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>

            <div className={`h-screen overflow-y-auto relative bg-gray-700
            grid ${styleRole} w-full ${visibleMenu ? 'p-4 max-md:p-0' : 'p-4'}  transition-all`}>
                <Header name={userName}></Header>
                <hr className="border border-white/20" />
                {Role == 'admin' && (<Controls chats={chat} setChats={setChat}></Controls>)}
                <hr className="border border-white/20" />

                <ul className="mt-4 w-full relative flex flex-col gap-3">
                    {
                        chat.map((item, index) => (
                            <ListView key={index} name={item.name} state={item.state} actives={activeUsers} setChat={setChat}></ListView>
                        ))
                    }
                </ul>

                <Button1 title="Cerrar sesión" style="w-full! text-white! cursor-pointer! hover:scale-110! h-max!" onClick={() => { handleSingOut() }} />
            </div>
        </motion.div>
    )
}

export default Menu;