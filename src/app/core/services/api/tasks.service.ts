import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';
import { PaginatedTasks, Task } from '../../interfaces/task';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  constructor(
    private dataService:DataService,
    private mapping:MappingService
  ){}

  private _tasks:BehaviorSubject<PaginatedTasks> = new BehaviorSubject<PaginatedTasks>({data:[], pagination:{page:0,pageCount:0, pageSize:0, total:0}});
  public tasks$:Observable<PaginatedTasks> = this._tasks.asObservable();
  public add(task:Task):Observable<Task>{
    return this.dataService.post<Task>("tasks", task).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
  }

  public query(q:string):Observable<PaginatedTasks>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.dataService.query<any>(this.mapping.queryTasksUrl(), {}).pipe(map(this.mapping.mapTasks.bind(this.mapping)));
  }

  public getAll():Observable<PaginatedTasks>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.dataService.query<any>(this.mapping.queryTasksUrl(), {}).pipe(map(this.mapping.mapTasks.bind(this.mapping)),tap(tasks=>{
      this._tasks.next(tasks);
    }));
  }

  public get(id:string):Observable<Task>{
    return this.dataService.get<any>(this.mapping.getTaskUrl(id)).pipe(map(this.mapping.mapUser.bind(this.mapping)));
  }

  public update(task:Task):Observable<Task>{
    return this.dataService.put<any>(this.mapping.updateTaskUrl(task.uuid!), task).pipe(map(this.mapping.mapTask.bind(this.mapping)));
  }

  public delete(task:Task):Observable<Task>{
    return this.dataService.delete<any>(this.mapping.deleteTaskUrl(task.uuid!)).pipe(map(this.mapping.mapTask.bind(this.mapping)));
  }
}
