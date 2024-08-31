import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    winner: any;
    gameHasStarted: boolean;
    gameState: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>;
    gameInfo: string[];
    playerTurn: string;
    whitePlayer: string | null;
    blackPlayer: string | null;
}

const initialState: GameState = {
    gameHasStarted: false,
    gameState: [],
    gameInfo: [],
    playerTurn: '',
    whitePlayer: null,
    blackPlayer: null,
    winner: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state, action: PayloadAction<Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>>) => {
            state.gameState = action.payload;
        },
        setGameHasStarted: (state, action: PayloadAction<boolean>) => {
            state.gameHasStarted = action.payload;
        },
        setPlayerTurn: (state, action: PayloadAction<string>) => {
            state.playerTurn = action.payload;
        },
        setWhitePlayer: (state, action: PayloadAction<string>) => {
            state.whitePlayer = action.payload;
        },
        setBlackPlayer: (state, action: PayloadAction<string>) => {
            state.blackPlayer = action.payload;
        },
        addGameInfo: (state, action: PayloadAction<string>) => {
            state.gameInfo.push(action.payload);
        },
        setWinner: (state, action: PayloadAction<any>) => {
            state.winner = action.payload;
        }
    },
});

export const { setGameState, setGameHasStarted, setPlayerTurn, setWhitePlayer, setBlackPlayer, addGameInfo } = gameSlice.actions;

export default gameSlice.reducer;
