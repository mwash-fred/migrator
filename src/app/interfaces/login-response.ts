import { Module } from "./module";

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    solCode: string;
    modules: Module[];
    firstLogin: string;
    accessToken: string;
    tokenType : string;

}
