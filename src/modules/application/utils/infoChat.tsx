interface Message {
    user: string,
    text: string,
}

export interface ChatProps{
    name: string,
    conversations: Message[],
    state: boolean
}

export const defaultInfoChat: ChatProps[] = [
    {
        name: 'Unicaribe Math ||',
        state: true,
        conversations: [
            {user: 'Andelson', text: 'sdalkfh alkfhaslfh'},
            {user: 'Nosuel', text: 'KLK salkjfh asdlfa'}
        ]
    },
     {
        name: 'Unicaribe Math |||',
        state: false,
        conversations: [
            {user: 'Andelson', text: 'sdalkfh alkfhaslfh'},
            {user: 'Arpisc', text: 'KLK salkjfh asdlfa'}
        ]
    },
]