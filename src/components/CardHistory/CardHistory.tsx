import { ReactElement } from "react";
import { useAuth } from "../Auth/AuthContext";


type CardHistoryProps = {
    winner: string;
    whitePlayer: string;
    blackPlayer: string;
    date: string;
    time: string;
    result: string;
}

export const CardHistory = ({ winner, whitePlayer, blackPlayer, date, time, result }: CardHistoryProps): ReactElement => {
    const { user } = useAuth();

    return (
        <div className="flex gap-4 border rounded-md p-6 max-w-[650px]">
            <div className="flex flex-wrap sm:gap-2 md:gap-4">
                <p className="text-white text-sm">Winner: <span>{winner == user?.nickname ? "You" : winner}</span></p>
                <p className="text-white text-sm">White Player: <span>{whitePlayer == user?.nickname ? "You" : whitePlayer}</span></p>
                <p className="text-white text-sm">Black Player: <span>{blackPlayer == user?.nickname ? "You" : blackPlayer}</span></p>
            </div>
            <div className="flex flex-col">
                <p className="text-white text-sm">Date: <span>{date}</span></p>
                <p className="text-white text-sm">Time: <span>{time}</span></p>
                <p className="text-white text-sm">Result: <span>{result}</span></p>
            </div>
            <div className="border-l p-3 flex justify-center items-center">
                <p className="text-blue-400">Detail</p>
            </div>
        </div>
    )
}