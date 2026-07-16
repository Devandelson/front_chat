// Resources
import { type ChatProps } from '../../../utils/infoChat.tsx';
import Swal from 'sweetalert2';

import { socket } from '../../../viewApp.tsx';

async function pushData(copyChat: ChatProps) {
    const fecth = await fetch('http://localhost:3000/api/chat/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_chat: copyChat.name,
            conversaciones: copyChat.conversations
        }),
        credentials: 'include'
    });
    const result = await fecth.json();

    if (result.status) {
        return true;
    }
    return false;
}

export async function handleSendMessage(
    userActives: string,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    chat: ChatProps
) {
    if (input == '') {
        Swal.fire({
            title: "No puedes enviar un mensaje vacío",
            icon: "error",
        });
        return;
    }
    Swal.fire({
        title: 'Enviando la información...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const newMessage = {
        user: String(userActives),
        text: input
    };

    const copyChat = {
        ...chat, conversations: [
            ...chat.conversations, newMessage
        ]
    };

    const resultEdit = await pushData(copyChat);

    if (resultEdit) {
        Swal.close();
        socket.emit('sendChat', copyChat);
    } else {
        Swal.close();
        Swal.fire({
            title: "No se pudo mandar el mensaje, actualize en intente otra vez.",
            icon: "error",
        });
    }

    setInput('');
}