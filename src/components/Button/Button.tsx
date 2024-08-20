import { ReactElement } from "react";

interface ButtonProps {
    value: string
    onClick?: () => void | null
    onSubmit?: () => void | null
    type?: "button" | "submit" | "reset";
    className?: string
}

export const Button = ({ value, type, className, onClick, onSubmit }: ButtonProps): ReactElement => {

    return (
        <button type={type} className={className ? className : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3 mb-3"} onClick={onClick} onSubmit={onSubmit}>
            {value}
        </button>
    )
}