import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export const Header = (): ReactElement => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <div className="flex justify-between items-center  h-16 p-3 bg-amber-500">
                <div className="flex align-center justify-center gap-3 m-1">
                    <Link to="/"><h1 className="m-0 text-2xl text-white">Checkers Game Online</h1></Link>
                </div>
                <div className="flex items-center justify-end gap-3 text-white font-bold text-xl relative">
                    <nav className="relative group inline-block">
                        {/* Nome do usuário */}
                        <p className="cursor-pointer p-2">{user?.nickname}</p>

                        {/* Submenu - agora posicionado diretamente abaixo do nome do usuário */}
                        <ul className="absolute right-0 mt-0 w-32 bg-amber-500  rounded-md shadow-lg hidden group-hover:block">
                            <li className="px-4 py-2 hover:bg-amber-500 hover:text-blue-500">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-amber-500 hover:text-blue-500">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </div>




            </div>


        </>
    )
}