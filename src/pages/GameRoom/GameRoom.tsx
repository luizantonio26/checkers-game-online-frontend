import { ReactElement, useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import { Board } from "../../components/Board/Board";
import { Button } from "../../components/Button/Button";
import { Message, MessageProps } from "../../components/Message/Message";
import { TextField } from "../../components/TextField/TextField";
import useSocket from "../../hooks/UseSocket";
import pieceImgDark from "../../images/brown.png";
import pieceImgLight from "../../images/light.png";
import BoardModel from "../../models/BoardModel";
import CellsModel from "../../models/CellsModel";
import { Labels } from "../../models/Labels";
import { addGameInfo, setBlackPlayer, setGameHasStarted, setGameState, setPlayerTurn, setWhitePlayer } from "../../utils/gameSlice";
import { RootState } from "../../utils/store";


interface GameState {
    piece_color: string;
    piece_type: string;
    piece_position: number[];
}

export const GameRoom = (): ReactElement => {
    const { roomName } = useParams();
    const [board, setBoard] = useState<BoardModel>(new BoardModel())
    const gameHasStarted = useSelector((state: RootState) => state.game.gameHasStarted);
    const gameState = useSelector((state: RootState) => state.game.gameState);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [message, setMessage] = useState<string>("");
    const socket = useSocket("ws://localhost:8000/gameroom/" + roomName + "/");
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [conectedPlayers, setConectedPlayers] = useState<string[]>([]);
    const [host, setHost] = useState<string>();
    const [isReady, setIsReady] = useState(false);
    const whitePlayer = useSelector((state: RootState) => state.game.whitePlayer);
    const blackPlayer = useSelector((state: RootState) => state.game.blackPlayer);
    const playerTurn = useSelector((state: RootState) => state.game.playerTurn);
    const gameInfo = useSelector((state: RootState) => state.game.gameInfo);
    const winner = useSelector((state: RootState) => state.game.winner);

    useEffect(() => {
        if (socket.message !== null) {
            if (socket.message.type === "chat_message" && "username" in socket.message.data && socket.message.data.username !== user?.nickname) {
                setMessages([...messages, { nickname: socket.message.data.username, message: socket.message.data.message }])
            } else if (socket.message.type === "show_players" && "players" in socket.message.data) {
                setConectedPlayers(socket.message.data.players);
                setHost(socket.message.data.host);
            } else if (socket.message.type === "ready" && "player" in socket.message.data) {
                if (socket.message.data.player !== host && socket.message.type === "ready") {
                    console.log(socket.message.data.player)
                    setIsReady(!isReady);
                }
            } else if (socket.message.type === "game_start" && "game_has_started" in socket.message.data) {
                const data = socket.message.data;
                dispatch(setGameHasStarted((data.game_has_started)));
                dispatch(setGameState(data.game_state));
                dispatch(setWhitePlayer(data.player1));
                dispatch(setBlackPlayer(data.player2));
                dispatch(setPlayerTurn(data.current_player));
            } else if (socket.message.type === "make_move" && "move_info" in socket.message.data) {
                const data = socket.message.data;
                console.log("move_info", data);
                dispatch(addGameInfo(data.move_info));
                dispatch(setGameState(data.game_state));
                console.log("player_turn", data.current_player);
                data.current_player != playerTurn ? dispatch(setPlayerTurn(data.current_player)) : console.log("player_turn after dispatch", playerTurn);

            } else if (socket.message.type === "show_state" && "state" in socket.message.data) {
                const data = socket.message.data;
                showState(board, data.state);
            } else if (socket.message.type === "leave") {
                dispatch(setGameHasStarted(false));
                dispatch(setGameState([]));
                dispatch(addGameInfo("Game ended"));
            } else if (socket.message.type == "surrender" && "winner" in socket.message.data) {
                dispatch(setGameHasStarted(false));
                dispatch(setGameState([]));
                dispatch(addGameInfo(`${socket.message.data.winner === user?.nickname ? "You" : socket.message.data.winner} won the game!`));
            }
        }
    }, [socket.message, dispatch])

    useEffect(() => {
        if (gameHasStarted) {
            const interval = setInterval(() => {
                // Despacha a ação de Redux para atualizar o estado
                socket.sendMessage({ action: "show_state", data: {} });
            }, 1000); // 1000 ms = 1 segundo

            // Limpa o intervalo quando o componente for desmontado
            return () => clearInterval(interval);
        }
    }, [dispatch]);

    useEffect(() => {
        if (winner) {
            alert(winner);
            dispatch(setGameHasStarted(false));
            dispatch(setGameState([]));
        }
    }, [winner])

    function showState(board: BoardModel, data: any) {
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                if (typeof (data[row][col]) === "object") {
                    const x = data[row][col].piece_position[1];
                    const y = data[row][col].piece_position[0];
                    const player = data[row][col].piece_color === "black" ? blackPlayer : whitePlayer
                    const label = data[row][col].piece_color === "black" ? Labels.Dark : Labels.Light

                    board.addPlayer(x, y, player)
                    data[row][col].piece_type === "Dama" ? board.addDama(label, x, y) : board.addFigure(label, x, y)
                } else {
                    board.setAvailable(row, col, data[row][col]);
                }
            }
        }
    }

    useEffect(() => {
        restart();
    }, [gameState])

    function startGame() {
        console.log("Starting game...");
        socket.sendMessage({
            action: "game_start",
            data: {}
        });
    }

    function sendMessage() {
        if (message.length > 0) {
            setMessages([...messages, { nickname: "You", message: message }]);
            socket.sendMessage({ action: "chat_message", data: { message: message } });
            setMessage("");
        }
    }

    const movePiece = (from: CellsModel, to: CellsModel) => {
        const start_pos = [from.x + 1, from.y + 1];
        const end_pos = [to.x + 1, to.y + 1];

        socket.sendMessage({ action: "make_move", data: { start_pos, end_pos } });
    }
    const restart = () => {
        const newBoard = new BoardModel();
        newBoard.createCells();
        showState(newBoard, gameState);
        setBoard(newBoard);
    }
    const handleSurrender = () => {
        socket.sendMessage({ action: "surrender", data: {} });
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start h-full w-full  bg-slate-400 p-1">
                {
                    <div className="grid justify-center gap-2 md:grid-cols-2 md:grid-rows-2 h-full p-4">
                        <div className="flex flex-col items-center h-[full] w-full md:min-w-[25rem] md:row-span-2 lg:col-span-1 ">
                            {gameHasStarted ?
                                <div className="flex flex-col items-center  h-full ">
                                    <div className="flex flex-row">
                                        {<img src={pieceImgLight} className="w-[3rem] h-[3rem]"></img>}
                                        <h1 className="text-3xl font-bold text-white">
                                            <span>{whitePlayer === user?.nickname ? "You" : whitePlayer}</span> vs <span>{blackPlayer === user?.nickname ? "You" : blackPlayer}</span>
                                        </h1>
                                        {<img src={pieceImgDark} className="w-[3rem] h-[3rem]"></img>}
                                        <Button onClick={handleSurrender} value="Desistir" className="bg-blue-500 h-9 rounded text-white font-bold p-1" />
                                    </div>
                                    <Board board={board} onSetBoard={setBoard} moveAction={movePiece} playerTurn={playerTurn} />
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                    {!conectedPlayers ? <h1 className="text-3xl font-bold">Waiting for players...</h1> :
                                        <div className="flex flex-col bg-black bg-opacity-35 p-4 text-white rounded-md">
                                            <h1 className="text-3xl font-bold">Players Conectados: </h1>
                                            <ul className="mt-2">
                                                {conectedPlayers.map((player, index) => (
                                                    <li key={index}>{player !== user?.nickname ? player : "You"} {player === host ? "(Host)" : "(Guest)"}</li>
                                                ))}
                                            </ul>

                                            {

                                                host === user?.nickname && !gameHasStarted ?

                                                    <Button
                                                        onClick={startGame}
                                                        value="Start Game"
                                                        disabled={conectedPlayers.length < 2 || !isReady}
                                                    />
                                                    :
                                                    // {conectedPlayers.length < 2 || !isReady ? true : false}
                                                    <Button onClick={() => socket.sendMessage({
                                                        action: "ready",
                                                        data: { player: user?.nickname }
                                                    })} value={isReady ? "Cancel" : "Ready"} />

                                            }
                                        </div>
                                    }
                                    <div className="flex flex-row items-center gap-2 mt-4">
                                        <span className="text-blue-200">Link da sala: <a className="text-white underline">{window.location.href}</a></span>
                                        <FaCopy className="cursor-pointer text-white" onClick={() => navigator.clipboard.writeText(window.location.href)} />
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex flex-col w-[90%] h-full">
                            <h1 className="text-3xl font-bold text-center">Game Infos</h1>
                            <div className="flex flex-col items-start justify-end h-full w-full bg-black bg-opacity-50 overflow-auto p-2" id="gameInfo">
                                {gameInfo.length > 0 ? (
                                    gameInfo.map((info, index) => (
                                        <p key={index} className="ml-2 text-white">{info}</p>
                                    ))
                                ) : (
                                    <div className="ml-2 text-white">No game info</div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-[90%] h-full max-h-[422px]">
                            <h1 className="text-3xl font-bold text-center mt-4">Chat</h1>
                            <div className="flex flex-col items-start justify-end h-full w-full bg-black bg-opacity-50 overflow-auto p-2" id="chat">
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <Message key={index} nickname={msg.nickname} message={msg.message} />
                                    ))
                                ) : (
                                    <div className="ml-2 text-white">No messages</div>
                                )}
                            </div>
                            <div className="flex flex-row gap-2 m-2">
                                <TextField
                                    name="message"
                                    type="text"
                                    id="message"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    onKeyDown={(e) => { if (e.key === "Enter") { sendMessage() } }}
                                />
                                <Button
                                    value="Send"
                                    className="h-11 w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={sendMessage}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}