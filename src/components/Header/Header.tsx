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
                <div className="flex align-center justify-end gap-3 text-white font-bold text-xl">
                    <p className="">{user?.nickname}</p>
                    {user ? <button onClick={handleLogout}>Logout</button> : null}
                </div>
            </div>


        </>
    )
}