import { PaginatedData } from "./data";
import { Media } from "./media";

export interface User {
    id:number,
    name:string,
    surname:string,
    nickname?:string
    picture?:Media|null,
}

export type PaginatedUsers = PaginatedData<User>;



