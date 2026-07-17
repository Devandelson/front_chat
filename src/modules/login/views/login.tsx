// resource
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Access } from '../utils/access.tsx'

// hooks
import { useState } from 'react';

// components
import Input from '../components/inputs.tsx';
import ButtonLogin from '../components/buttonLogin.tsx';
import ContainerAreas from '../components/containerLogin.tsx';

export default function Login() {
    const navigate = useNavigate();

    const [inputsDates, setInputsDates] = useState({
        name: '',
        password: '',
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        Swal.fire({
            title: 'Verificando el usuario...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const result = await Access(inputsDates.name, inputsDates.password);
        
        if (result.state) {
            Swal.close();
            Swal.fire({
                title: result.message,
                icon: 'success'
            });
            if (!localStorage.getItem('userName') || String(!localStorage.getItem('userName')) !== inputsDates.name) {
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('role', result.data.role);
            }

            navigate('/app');
            return;
        } else {
            Swal.close();
            Swal.fire({
                title: 'Estamos trabajando en ello; recargue la página e intente de nuevo.',
                icon: 'error'
            });
            return;
        }
    }

    return (
        <ContainerAreas>
            <motion.section
                className="relative w-full max-w-md bg-white border-6 border-orange-300 rounded-3xl p-8 shadow-2xl shadow-black/40"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Inicia sesión</h1>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                        Entra a tus chats cifrados con solo un usuario y una contraseña.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        label="Nombre de usuario"
                        holder="Usuario"
                        name="name"
                        value={inputsDates.name}
                        setInputsDates={setInputsDates}
                    />
                    <Input
                        label="Contraseña"
                        holder="●●●●●●●●"
                        type="password"
                        name="password"
                        value={inputsDates.password}
                        setInputsDates={setInputsDates}
                    />

                    <div className="flex items-center justify-center flex-wrap gap-3 mt-4">
                        {/* Quitamos el onClick conflictivo de aquí, ahora lo maneja handleSubmit */}
                        <ButtonLogin
                            text="Iniciar sesión"
                            type="submit"
                            active={true}
                        />
                        <ButtonLogin
                            text="Crear cuenta"
                            click={() => navigate('/create')}
                            type="button"
                            active={false}
                        />
                    </div>
                </form>
            </motion.section>
        </ContainerAreas>
    );
}