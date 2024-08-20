import { ReactElement } from "react";
import { useAuth } from "../Auth/AuthContext";

export const Header = (): ReactElement => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <div className="flex justify-between items-center p-[20px]  h-7/10 w-full bg-amber-600">
                <div className="flex align-center justify-center gap-3 m-3">
                    <h1 className="m-0 text-2xl text-white">Checkers Game Online</h1>
                </div>
                <div className="flex align-center justify-end gap-3 text-white font-bold text-xl">
                    <p className="">{user?.nickname}</p>
                    {user ? <button onClick={handleLogout}>Logout</button> : null}
                </div>
            </div>


        </>
    )
}