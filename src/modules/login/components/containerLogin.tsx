export default function ContainerAreasLogin({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-[#0E1613] flex items-center justify-center p-4 relative overflow-hidden">
            {/* resplandor ambiental */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#D9A441]/10 rounded-full blur-3xl pointer-events-none" /><div />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#7DD9B0]/10 rounded-full blur-3xl pointer-events-none"></div>

            {children}
        </div>
    )
}   