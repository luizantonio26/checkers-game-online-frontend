import { useEffect, useRef, useState } from 'react';

interface ClientToServerChatMessage {
    data: object;
    action: string;
}

export interface ChatMessage {
    type: string;
    data: {
        username: string;
        message: string;
    };
}

export interface ShowPlayersMessage {
    type: string;
    data: {
        players: string[];
        host: string;
    }
}

export interface ReadyMessage {
    type: string;
    data: {
        "player": string;
    }
}


export interface GameStartMessage {
    type: string;
    data: {
        "player1": string;
        "player2": string;
        "current_player": string;
        "game_has_started": boolean;
        "game_state": any[][];
    }
}

export interface MakeMoveMessage {
    type: string;
    data: {
        "move_info": string;
        "game_state": any[][];
        "current_player": string;
        "next_player": string;
        "turned_dama": boolean;
        "piece_moved": number[];
    }
}

export interface SimpleMessage {
    type: string;
    data: {
        "message": string;
    }
}

const useWebSocket = (url: string) => {
    const [message, setMessage] = useState<ChatMessage | ReadyMessage | GameStartMessage | MakeMoveMessage | ShowPlayersMessage | SimpleMessage | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!token) {
            return;
        }

        const socketInstance = new WebSocket(url.concat(`?token=${token}`));
        socketRef.current = socketInstance;
        setSocket(socketInstance);

        socketInstance.onopen = () => {
            console.log('Connected to WebSocket server');
            sendMessage({ data: {}, action: 'show_players' });
        };

        socketInstance.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        socketInstance.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data) as ChatMessage | ReadyMessage | GameStartMessage | MakeMoveMessage | ShowPlayersMessage | SimpleMessage;
            setMessage(data);
        };

        socketInstance.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socketInstance.close();
        };
    }, [url]);


    const sendMessage = (msg: ClientToServerChatMessage) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(msg));
        } else {
            console.warn('WebSocket is not open. Message not sent.');
        }
    };

    return { message, sendMessage };
};

export default useWebSocket;
