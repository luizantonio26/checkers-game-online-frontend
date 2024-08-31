import { ReactElement } from "react";

export interface MessageProps {
    nickname: string;
    message: string;
}
export const Message = ({ nickname, message }: MessageProps): ReactElement => {
    return (
        <div className="ml-2">
            <strong className={"font-bold" + (nickname === "You" ? " text-blue-600" : " text-orange-500")}>{nickname}: </strong>
            <span className="text-white">{message}</span>
        </div>
    );
}