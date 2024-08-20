import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import { Button } from "../../components/Button/Button";
import { TextField } from "../../components/TextField/TextField";
import { UserService } from "../../services/UserService";


export const Login = (): ReactElement => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/');
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const credentials = await UserService.loginUser(email, password);

            if (credentials) {
                console.log("logado com sucesso!")
                const user = await login(credentials);
                navigate('/')
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    }

    return (
        <div className="flex flex-col justify-center align-center w-80 h-80 border-[1px] border-[#ccc] p-5 shadow-[0 0 10px rgba(0, 0, 0, 0.2)] rounded-md bg-[#f5f5f5]">
            <h1 className="text-3xl font-bold mb-4 self-center">Login</h1>
            <form onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div> */}
                <TextField id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="text-red-500 ">{error}</p>}
                <Button value="Login" type="submit" />
                <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </form>
        </div>
    )
}
