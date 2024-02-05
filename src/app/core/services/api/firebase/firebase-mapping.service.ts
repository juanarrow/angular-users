import { Inject, Injectable } from '@angular/core';
import { PaginatedData } from '../../../interfaces/data';
import { StrapiExtendedUser, StrapiResponse } from '../../../interfaces/strapi';
import { User } from '../../../interfaces/user';
import { Task } from '../../../interfaces/task';
import { MappingService } from '../mapping.service';

export class FirebaseMappingService extends MappingService{

  constructor() {
    super();
   }
  
  public queryUsersUrl():string{
    return `users`;
  }

  public override getUserUrl(id: number): string;
  public override getUserUrl(id: string): string;
  public override getUserUrl(id: unknown): string {
    return `users/${id}`;
  }

  public override updateUserUrl(id: number): string;
  public override updateUserUrl(id: string): string;
  public override updateUserUrl(id: unknown): string {
    return `users/${id}`;
  }

  public override deleteUserUrl(id: number): string;
  public override deleteUserUrl(id: string): string;
  public override deleteUserUrl(id: unknown): string {
    return `users/${id}`;
  }

  public mapUsers(data:PaginatedData<any>):PaginatedData<User>{
    return {
      data:data.data,
      pagination:{
        page:0,
        pageSize:data.data.length,
        pageCount:1,
        total:data.data.length
      }
    };
  }

  public mapUser(data:User):User{
    return data;
  }

  public override queryTasksUrl(): string {
    return 'tasks';
  }

  public override getTaskUrl(id: number): string;
  public override getTaskUrl(id: string): string;
  public override getTaskUrl(id: unknown): string {
    if((typeof id) == 'number' || (typeof id) =='number')
      throw new Error('Method not implemented.');
    return `tasks/${id}`;

  }

  public override updateTaskUrl(id: number): string;
  public override updateTaskUrl(id: string): string;
  public override updateTaskUrl(id: unknown): string {
    return `tasks/${id}`;
  }

  public override deleteTaskUrl(id: number): string;
  public override deleteTaskUrl(id: string): string;
  public override deleteTaskUrl(id: unknown): string {
    return `tasks/${id}`;
  }

  public override mapTasks(data: PaginatedData<any>): PaginatedData<Task> {
    return {
      data:data.data,
      pagination:{
        page:0,
        pageSize:data.data.length,
        pageCount:1,
        total:data.data.length
      }
    }
  }

  public override mapTask(data: any): Task {
    return data;
  }
}
