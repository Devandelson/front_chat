import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { type ChatProps } from '../../../utils/infoChat.tsx';
import { handleCreateChat, handleDeleteChat } from '../utils/manageChatFolder.tsx';

interface ControlsProps {
    chats: ChatProps[];
    setChats: React.Dispatch<React.SetStateAction<ChatProps[]>>;
}

export default function Controls({ chats, setChats }: ControlsProps) {
    return (
        <section className="flex items-center gap-1.5 p-2 flex-wrap">
            <button className="text-lg text-white hover:scale-110 active:scale-[0.95] cursor-pointer" onClick={() => handleCreateChat(chats, setChats)}>
                <FontAwesomeIcon icon={faFolderPlus}></FontAwesomeIcon>
            </button>
            <button className="text-lg text-white hover:scale-110 active:scale-[0.95] cursor-pointer" onClick={() => handleDeleteChat(chats, setChats)}>
                <FontAwesomeIcon icon={faFolderMinus}></FontAwesomeIcon>
            </button>
        </section>
    );
}