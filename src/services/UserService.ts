import { AxiosResponse } from "axios";
import { MatchHistory } from "../models/MatchHistory";
import { UserCredentials } from "../models/UserCredentials";
import { CreateUserModel, UserModel } from "../models/UserModel";
import { api } from "./API";

export class UserService {

    static async registerUser(user: CreateUserModel): Promise<UserCredentials> {
        const response: AxiosResponse = await api.post('/auth/register/', user);

        if (response.status !== 201) {
            throw new Error("Failed to register user");
        }

        return response.data
    }

    static async loginUser(email: string, password: string): Promise<UserCredentials> {
        const response: AxiosResponse = await api.post('/auth/login/', { email, password });

        if (response.status !== 200) {
            throw new Error(response.data.detail);
        }

        return response.data
    }

    static async getProfile(token: string): Promise<UserModel> {
        const response: AxiosResponse = await api.get('/auth/profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error(response.data.detail);
        }

        return response.data
    }

    static async getMatchHistory(): Promise<MatchHistory[]> {
        const response: AxiosResponse = await api.get('/matches/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status !== 200) {
            throw new Error(response.data.detail);
        }

        return response.data
    }
}