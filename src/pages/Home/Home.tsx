import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import { Button } from "../../components/Button/Button";
import { TextField } from "../../components/TextField/TextField";

export const Home = (): ReactElement => {
    const { user } = useAuth();
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();
    const handleCreateRoom = () => {
        navigate(`/gameroom/${roomName}`);
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold">Criar Sala</h1>

            <div className="flex gap-4 justify-center mt-6">
                <TextField name="roomName" type="text" id="roomName" placeholder="Nome da sala" value={roomName} onChange={(e) => setRoomName(e.target.value)} />

                <Button onClick={handleCreateRoom} value="Criar" className="h-11 w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
            </div>

        </div>
    )
}