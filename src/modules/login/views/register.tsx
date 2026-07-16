// resource
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import { createUser } from '../utils/createUser.tsx'

// components
import Input from '../components/inputs.tsx';
import ButtonLogin from '../components/buttonLogin.tsx';
import ContainerAreas from '../components/containerLogin.tsx';

// hooks
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [inputsDates, setInputsDates] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { name, password, confirmPassword } = inputsDates;
        if (confirmPassword.trim() !== password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos, de forma correcta.',
            });
            return;
        }
        const result = await createUser(name, password);
        if (result.state) {
            Swal.fire({
                title: result.message,
                icon: 'success'
            });
        } else {
            Swal.fire({
                title: 'Ya existe un nombre relacionado, identifiquese mejor.',
                icon: 'error'
            });
        }
        return;
    }

    return (
        <ContainerAreas>
            <motion.section className="relative w-full max-w-md bg-white border-6 border-orange-300 rounded-3xl p-8 shadow-2xl shadow-black/40"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Registrarse</h1>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                        Solo es para identificar a la persona.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input label='Nombre de usuario' holder='Usuario' name='name' value={inputsDates.name} setInputs2={setInputsDates} />
                    <Input label='Contraseña' holder='••••••••' type='password' name='password' value={inputsDates.password} setInputs2={setInputsDates} />
                    <Input label='Repetir contraseña' holder='••••••••' type='password' name='confirmPassword' value={inputsDates.confirmPassword} setInputs2={setInputsDates} />

                    <div className="flex items-center justify-center flex-wrap gap-3 mt-4">
                        <ButtonLogin text='Volver al inicio' type='button'
                            click={() => { navigate('/') }}
                            active={false}
                        />
                        <ButtonLogin text='Crear cuenta' type='submit' active={true} />
                    </div>
                </form>
            </motion.section>
        </ContainerAreas>
    )
}