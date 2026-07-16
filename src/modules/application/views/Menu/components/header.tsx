export interface HeaderProps {
    name: string
}

export default function Header({ name }: HeaderProps) {
    const firstLetter = name.split('')[0].toUpperCase();

    return (
        <section className="w-full h-auto flex items-center justify-center gap-3 mb-3 text-white">
            <span className="w-12 aspect-square rounded-full bg-gray-600 flex items-center justify-center font-bold text-white">{firstLetter}</span>
            <div className="w-full flex flex-col gap-1 relative text-[16px]">
                <p className="flex items-center gap-1.5 -mb-1">Estado: <span className="w-3 aspect-square rounded-full bg-green-400 block"></span></p>
                <p><b>{name}</b></p>
            </div>
        </section>
    )
}