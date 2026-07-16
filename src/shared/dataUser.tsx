import { create } from 'zustand';

// 1. Definimos el tipo estricto de los datos
interface UserState {
    name: string;
    password: string;
    setDates: (name: string) => void;
}

// 2. Ejecutamos 'create' una Sola vez de manera global.
// ¡Ojo! No debe haber ningún hook de React aquí adentro.
const StoreDataUsers = create<UserState>((set) => ({
    name: '',
    password: '',
    setDates: (name) => set({ name }),
}));

export default StoreDataUsers;