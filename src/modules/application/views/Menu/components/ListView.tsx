import { type ChatProps } from '../../../utils/infoChat.tsx';

export interface LiProps {
    name: string,
    actives: number,
    state: boolean,
    setChat: React.Dispatch<React.SetStateAction<ChatProps[]>>
}

export default function Li({ name, actives, state, setChat }: LiProps) {
    const firstLetter = name.split('')[0].toUpperCase();
    const active = state ? 'bg-gray-900/80!' : '';

    function SwitchChat(name: string) {
        setChat((prev: ChatProps[]) => {
            return prev.map((item) => {
                return {
                    ...item,
                    state: item.name == name
                }
            })
        });
    }

    return (
        <li className={`flex items-center gap-2.5 bg-gray-500/30 rounded-sm p-2 cursor-pointer
        hover:-translate-y-1.5 hover:bg-gray-900/80 transition-all duration-150 ${active}
        `}
        onClick={() => {SwitchChat(name)}}
        >
            <span className="w-9 aspect-square rounded-full bg-blue-300 text-white
            text-center flex items-center justify-center">{firstLetter}</span>
            <div className="text-white">
                <p className='w-full wrap-break-word text-wrap'>{name}</p>
                <p>Activos: {actives}</p>
            </div>
        </li>
    )
}