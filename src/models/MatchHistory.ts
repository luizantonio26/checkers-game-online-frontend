

class MatchMoviments {
    piece_color: string;
    piece_type: string;
    state_before_move: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>;
    state_after_move: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>;
    was_capture: boolean;
    origin_x: number;
    origin_y: number;
    destiny_x: number;
    destiny_y: number;

    constructor(
        piece_color: string,
        piece_type: string,
        state_before_move: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>,
        state_after_move: Array<Array<boolean | { piece_color: string; piece_type: string; piece_position: number[] }>>,
        was_capture: boolean,
        origin_x: number,
        origin_y: number,
        destiny_x: number,
        destiny_y: number) {
        this.piece_color = piece_color;
        this.piece_type = piece_type;
        this.state_before_move = state_before_move;
        this.state_after_move = state_after_move;
        this.was_capture = was_capture;
        this.origin_x = origin_x;
        this.origin_y = origin_y;
        this.destiny_x = destiny_x;
        this.destiny_y = destiny_y;
    }
}

export class MatchHistory {
    id: number;
    game_id: string;
    match_date: Date;
    white_player: string;
    black_player: string;
    winner: string;
    game_status: string;
    moviments?: MatchMoviments[];

    constructor(id: number, game_id: string, match_date: string | Date, white_player: string, black_player: string, winner: string, game_status: string, moviments?: MatchMoviments[]) {
        this.id = id;
        this.match_date = new Date(match_date); // Converte string ISO para Date
        this.white_player = white_player;
        this.black_player = black_player;
        this.winner = winner;
        this.game_status = game_status;
        this.game_id = game_id;
        this.moviments = moviments;
    }
}