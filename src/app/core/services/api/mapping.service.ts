import { Injectable } from "@angular/core";
import { PaginatedData } from "../../interfaces/data";
import { User } from "../../interfaces/user";
import { Task } from "../../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export abstract class MappingService {

  public abstract queryUsersUrl():string;

  public abstract getUserUrl(id:number):string;

  public abstract updateUserUrl(id:number):string;

  public abstract deleteUserUrl(id:number):string;
  
  public abstract mapUsers(data:PaginatedData<any>):PaginatedData<User>;

  public abstract mapUser(data:any):User;

  public abstract queryTasksUrl():string;

  public abstract getTaskUrl(id:number):string;

  public abstract getTaskUrl(id:string):string;

  public abstract updateTaskUrl(id:string):string;
  public abstract updateTaskUrl(id:number):string;

  public abstract deleteTaskUrl(id:string):string;
  public abstract deleteTaskUrl(id:number):string;
  
  public abstract mapTasks(data:PaginatedData<any>):PaginatedData<Task>;

  public abstract mapTask(data:any):Task;
  
}
