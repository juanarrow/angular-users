import { PaginatedData } from "./data";
import { Media } from "./media";

export interface User {
    id?:number,
    name:string,
    surname:string,
    nickname?:string
    picture?:Media|undefined,
    uuid?:string
}

export type PaginatedUsers = PaginatedData<User>;



