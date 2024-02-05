import { PaginatedData } from "./data";
import { Media } from "./media";

export interface Task {
    id?:number,
    name:string,
    picture?:Media|undefined,
    uuid?:string
}

export type PaginatedTasks = PaginatedData<Task>;



