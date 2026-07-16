// Resources ====================================================
import { type ChatProps } from '../../../utils/infoChat.tsx';
import Swal from 'sweetalert2'
import { socket } from '../../../viewApp.tsx';

interface handleProps {
    indexMessage: number,
    chat: ChatProps,
    name: string,
}

export default function handleDeleteMessage({ indexMessage, chat, name }: handleProps) {
    Swal.fire({
        title: "¿Estás seguro de eliminar este mensaje?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (!result.isConfirmed) return;

        const message = chat.conversations[indexMessage];

        if (!message) {
            return Swal.fire({
                title: "No puedes eliminar este mensaje",
                text: "El mensaje ya no existe.",
                icon: "error"
            });
        }

        if (message.user !== name) {
            return Swal.fire({
                title: "No puedes eliminar este mensaje",
                text: "Solo puedes eliminar tus propios mensajes.",
                icon: "error"
            });
        }

        // Build the new array up front — no side effects hidden inside setChat
        const conversacionActualizada = chat.conversations.filter((_, idx) => idx !== indexMessage);

        ManageDeleteMessage(chat.name, conversacionActualizada).then((exito) => {
            if (!exito) {
                return Swal.fire({
                    title: "!",
                    text: "No se pudo eliminar el mensaje, recargue en intente de nuevo.",
                    icon: "error"
                });
            }

            Swal.fire({
                title: 'Eliminando la información...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Pass the specific chat with the change conversation (so, the chat that one user delete a message).
            const buildUpdateChat: ChatProps = {
                name: chat.name,
                conversations: conversacionActualizada,
                state: chat.state
            }
            // emit the change.
            socket.emit('sendUpdateChat', buildUpdateChat);
            
            Swal.close();
            Swal.fire({
                title: "¡Eliminado!",
                text: "El mensaje ha sido borrado.",
                icon: "success"
            });
        });
    });
}

async function ManageDeleteMessage(nombre_chat: string, conversacion?: ChatProps['conversations']) {
    try {
        const FecthDelete = await fetch('http://localhost:3000/api/chat/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_chat: nombre_chat,
                conversaciones: conversacion
            }),
            credentials: 'include'
        });

        const result = await FecthDelete.json();
        return !!result.status; // Retorna true si status existe y es verdadero
    } catch (error) {
        console.error("Error conectando con la API de borrado:", error);
        return false;
    }
}