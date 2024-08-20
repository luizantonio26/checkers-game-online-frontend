import React, { ReactElement } from 'react'

interface TextFieldProps {
    name?: string
    type: string
    id: string
    placeholder?: string
    value: string
    error?: string
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const TextField = ({ name, type, id, placeholder, value, className, onChange, onKeyDown, error }: TextFieldProps): ReactElement => {
    const base_class = "shadow appearance-none border rounded w-full h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    return (
        <div className="mb-3 w-full">
            <input
                className={className ? className : base_class}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}