// Components ==================================================
import Menu from "./views/Menu/menu.tsx";
import Chat from "./views/Chat/Chat.tsx";
import route from '@shared/enviromentUrl.ts'

// Hooks ======================================================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Resources ========================================
import { type ChatProps, defaultInfoChat } from './utils/infoChat.tsx';
import Swal from "sweetalert2";
import io from 'socket.io-client'

// ----- execute the environment
export const socket = io(route, {
    withCredentials: true,
    autoConnect: false,
});

export default function ViewApp() {
    const navigate = useNavigate();
    const [chat, setChat] = useState<ChatProps[]>(defaultInfoChat);
    const [users, setUsers] = useState<string[]>([]);
    const userActives = localStorage.getItem('userName');

    if (String(userActives).trim() == null) {
        Swal.fire({
            title: 'No se encuentra el usuario, inicie sesión nuevamente.',
            icon: 'error'
        });
        navigate('/');
    }

    // loading the chats.
    useEffect(() => {
        async function requestData(
            sendUser: () => void,
            anotherMessages: () => void
        ) {
            const response = await fetch(`${route}api/chat/chats`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();

            if (result.status) {
                socket.auth = { username: localStorage.getItem('userName') ?? '' };
                socket.connect();
                
                const { data } = result;
                const convertData: ChatProps[] = data.map((
                    item: { nombre_chat: string, conversaciones: string },
                    index: number) => {
                    return {
                        name: item.nombre_chat,
                        conversations: JSON.parse(item.conversaciones),
                        state: (index == 0 ? true : false)
                    };
                });

                setChat(convertData);
                sendUser();
                anotherMessages();
                return true;
            } else {
                Swal.fire({
                    title: result.message,
                    icon: 'error'
                });
                navigate('/');
                return false;
            }
        }

        function sendUser() {
            socket.on('statUsers', (userList: string[]) => {
                setUsers(userList);
            });
        }

        function anotherMessages() {
            socket.on('channelChat', (chat: ChatProps) => {
                setChat((prev: ChatProps[]) => {
                    const copyPrev = prev.map((item) => {
                        if (item.name == chat.name) {
                            return {
                                ...item,
                                conversations: chat.conversations
                            }
                        }
                        return item;
                    });
                    return copyPrev;
                });
            });

            // listen when a specific chat, one user delete a message
            socket.on('channelDeleteChat', (chat: ChatProps) => {
                // update just that specific chat.
                setChat((prev: ChatProps[]) => {
                    const copyPrev = prev.map((item) => {
                        if (item.name == chat.name) {
                            return {
                                ...item,
                                conversations: chat.conversations
                            }
                        }
                        return item;
                    });
                    return copyPrev;
                });
            });
        }

        requestData(sendUser, anotherMessages);
        return () => {
            socket.off('sendUsers');
            socket.off('activeUsers');
            socket.off('channelChat');
        }
    }, []);

    const activeChat = chat.find((item) => item.state === true) || {
        name: 'Ningún chat seleccionado (+)',
        conversations: [],
        state: false
    };

    return (
        <div className="w-full h-screen relative grid grid-cols-[auto_1fr] bg-gray-700">
            <Menu chat={chat} setChat={setChat} users={users}></Menu>
            <Chat chat={activeChat} users={users}></Chat>
        </div>
    )
}