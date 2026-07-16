interface InputProps {
    label: string;
    name: string;
    holder: string;
    value: string;
    type?: string;
    setInputsDates?: React.Dispatch<React.SetStateAction<{ name: string; password: string }>>;
    setInputs2?: React.Dispatch<React.SetStateAction<{ name: string; password: string; confirmPassword: string }>>;
}

export default function Input({ label, name, holder, value, type = 'text', setInputsDates, setInputs2 }: InputProps) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (setInputsDates) {
            setInputsDates((prev) => ({ ...prev, [name]: value }));
        }
        if (setInputs2) {
            setInputs2((prev) => ({ ...prev, [name]: value }));
        }
    }

    return (
        <div>
            <label htmlFor="name" className="block text-xs font-medium mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type || 'text'}
                    name={name}
                    placeholder={holder}
                    className="w-full bg-gray-500/20 border border-white/10 rounded-xl text-sm placeholder:text-[#5A6B65] focus:outline-none focus:ring-2 focus:ring-[#D9A441]/50 focus:border-[#D9A441]/40
                            transition p-2.5"
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
