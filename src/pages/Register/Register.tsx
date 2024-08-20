import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import { Button } from "../../components/Button/Button";
import { TextField } from "../../components/TextField/TextField";
import { CreateUserModel } from "../../models/UserModel";
import { UserService } from "../../services/UserService";

export const Register = (): ReactElement => {
    const { login, user } = useAuth();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = new CreateUserModel(email, password, passwordConfirm, firstName, lastName, nickname);

            const credentials = await UserService.registerUser(user);

            if (credentials) {
                const user = await login(credentials);
                navigate('/');
            }
        }
        catch (error) {
            setError('Error registering user');
        }

    }

    return (
        <>
            <div className="flex flex-col justify-center align-center w-[25rem] h-[30rem] border-[1px] border-[#ccc] p-5 shadow-[0 0 10px rgba(0, 0, 0, 0.2)] rounded-md bg-[#f5f5f5]">
                <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                <form onSubmit={handleRegister}>
                    {/* <div className="form-group">
                        <input type="text" name="nickname" placeholder="Nickname" />
                    </div> */}
                    <TextField name="nickname" type="text" id="nickname" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    <TextField name="email" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField name="password" type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField name="password_confirm" type="password" id="password_confirm" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    <TextField name="first_name" type="text" id="first_name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField name="last_name" type="text" id="last_name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <Button type="submit" value="Register" />

                    <p className="text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </form>
            </div>
        </>
    )
}