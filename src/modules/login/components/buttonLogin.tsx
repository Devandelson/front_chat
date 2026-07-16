export default function ButtonLogin({ click, text, type, active }:
{ click?: () => void, text: string, type: 'button' | 'submit' | 'reset',
  active: boolean
}) {
    const stateButton = active ? 'bg-[#D9A441]' : 'bg-gray-600';

    return (
        <button
            type={`${type || 'submit'}`}
            className={`w-max py-2.5 rounded-lg text-white font-semibold text-sm hover:bg-[#E5B563] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#142220] transition px-5 cursor-pointer hover:scale-110 ${stateButton}`}
            onClick={click}
        >
            {text}
        </button>
    )
}