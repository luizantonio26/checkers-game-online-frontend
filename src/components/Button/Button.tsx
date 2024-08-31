import { ReactElement } from "react";

interface ButtonProps {
    value: string
    onClick?: () => void | null
    onSubmit?: () => void | null
    type?: "button" | "submit" | "reset";
    className?: string,
    disabled?: boolean
}

export const Button = ({ value, type, className, onClick, onSubmit, disabled }: ButtonProps): ReactElement => {
    const defaultClasses = "bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-3 mb-3";
    const enabledClasses = "hover:bg-blue-700";
    const disabledClasses = "bg-gray-400 text-gray-700 cursor-not-allowed";

    return (
        <button
            type={type}
            className={`${className ? className : defaultClasses} ${disabled ? disabledClasses : enabledClasses}`}
            onClick={onClick}
            onSubmit={onSubmit}
            disabled={disabled}
        >
            {value}
        </button>
    )
}