import { ReactElement, useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/AuthContext";
import { CardHistory } from "../../components/CardHistory/CardHistory";
import { MatchHistory } from "../../models/MatchHistory";
import { UserService } from "../../services/UserService";


export const Profile = (): ReactElement => {
    const { user } = useAuth();
    const [matchHistory, setMatchHistory] = useState<MatchHistory[]>();

    const getMatchHistory = async () => {
        const history = await UserService.getMatchHistory();
        setMatchHistory(history);
    }

    useEffect(() => {
        getMatchHistory();
        console.log(matchHistory)
    }, [])

    return (
        <div className="bg-gray-600 flex flex-col lg:flex-row lg:gap-24 lg:justify-center p-6 w-full h-lvh">
            <div className="flex flex-col items-center">
                <div>
                    <img
                        className="w-52 h-52 rounded-full"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    />
                </div>
                <div>
                    <h1 className="text-white mt-4 text-2xl">{user?.first_name + " " + user?.last_name}<span className="text-blue-500 text-sm font-bold"> @{user?.nickname}</span></h1>
                    <p className="text-white mt-4 start">Email: {user?.email}</p>
                </div>
            </div>
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-white mt-4 text-2xl">Match History</h1>
                <div className="flex flex-col gap-4 sm:gap-2 mt-8">
                    {/* <CardHistory winner="Cleber" whitePlayer="Cleber" blackPlayer={user?.nickname ? user?.nickname : ""} date="10/10/2022" time="12:00" result="1x0" /> */}
                    {
                        matchHistory?.map((match, index) => (
                            <CardHistory
                                key={index}
                                winner={match.winner}
                                whitePlayer={match.white_player}
                                blackPlayer={match.black_player}
                                date={new Date(match.match_date).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                                time={"12:00"}
                                result={"1x0"}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}