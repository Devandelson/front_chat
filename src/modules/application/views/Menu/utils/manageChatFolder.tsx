import Swal from 'sweetalert2';
import { type ChatProps } from '../../../utils/infoChat.tsx';

async function createChatRequest(nombre_chat: string) {
    try {
        const res = await fetch('http://localhost:3000/api/chat/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_chat }),
            credentials: 'include'
        });
        const result = await res.json();
        return { status: !!result.status, message: result.message ?? 'Error desconocido' };
    } catch (error) {
        console.error('Error creando chat:', error);
        return { status: false, message: 'No se pudo conectar con el servidor.' };
    }
}

async function deleteChatRequest(nombre_chat: string) {
    try {
        const res = await fetch('http://localhost:3000/api/chat/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_chat }),
            credentials: 'include'
        });
        const result = await res.json();
        return { status: !!result.status, message: result.message ?? 'Error desconocido' };
    } catch (error) {
        console.error('Error eliminando chat:', error);
        return { status: false, message: 'No se pudo conectar con el servidor.' };
    }
}

export async function handleCreateChat(
    chats: ChatProps[],
    setChats: React.Dispatch<React.SetStateAction<ChatProps[]>>
) {
    const { value: nombreChat } = await Swal.fire({
        title: 'Crear nuevo chat',
        html: 'Escribe el nombre del chat que deseas crear. Se creará <b>vacío</b>, sin ninguna conversación previa.',
        input: 'text',
        inputLabel: 'Nombre del chat',
        inputPlaceholder: 'Ej: Unicaribe Math',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value || value.trim() === '') return 'Debes escribir un nombre para el chat.';
            if (chats.some((c) => c.name.trim().toLowerCase() === value.trim().toLowerCase())) {
                return 'Ya existe un chat con ese nombre.';
            }
        }
    });

    if (!nombreChat) return; // canceló

    const nombreLimpio = nombreChat.trim();
    const { status, message } = await createChatRequest(nombreLimpio);

    if (!status) {
        return Swal.fire({ title: 'No se pudo crear el chat', text: message, icon: 'error' });
    }

    setChats((prev) => {
        const copyPrev = prev.map((item) => {
            return { ...item, state: false };
        });

        copyPrev.push({
            name: nombreLimpio,
            conversations: [],
            state: true
        });
        return copyPrev;
    });

    Swal.fire({ title: '¡Chat creado!', text: `"${nombreLimpio}" fue creado correctamente.`, icon: 'success' });
}

export async function handleDeleteChat(
    chats: ChatProps[],
    setChats: React.Dispatch<React.SetStateAction<ChatProps[]>>
) {
    if (chats.length === 0) {
        return Swal.fire({ title: 'No hay chats para eliminar', icon: 'info' });
    }

    const { value: nombreChat } = await Swal.fire({
        title: 'Eliminar chat',
        input: 'select',
        inputOptions: Object.fromEntries(chats.map((c) => [c.name, c.name])),
        inputPlaceholder: 'Selecciona un chat',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        inputValidator: (value) => {
            if (!value) return 'Debes seleccionar un chat.';
        }
    });

    if (!nombreChat) return;

    const confirm = await Swal.fire({
        title: `¿Eliminar "${nombreChat}"?`,
        text: 'Se borrará todo su contenido de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
    });

    if (!confirm.isConfirmed) return;

    const { status, message } = await deleteChatRequest(nombreChat);

    if (!status) {
        return Swal.fire({ title: 'No se pudo eliminar el chat', text: message, icon: 'error' });
    }

    setChats((prev) => {
        const copyPrev = prev.filter((c) => c.name !== nombreChat).map((item, index) => {
            return {...item, state: index == 0}
        });
        return copyPrev;
    });

    Swal.fire({ title: '¡Chat eliminado!', text: `"${nombreChat}" fue eliminado correctamente.`, icon: 'success' });
}