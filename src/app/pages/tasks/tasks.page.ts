import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { MediaService } from 'src/app/core/services/api/media.service';
import { TasksService } from 'src/app/core/services/api/tasks.service';
import { FavouritesService } from 'src/app/core/services/favourites.service';
import { Pagination } from 'src/app/core/interfaces/data';
import { Task } from 'src/app/core/interfaces/task';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { TaskDetailComponent } from 'src/app/shared/components/task-detail/task-detail.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  private _tasks = new BehaviorSubject<Task[]>([]);
  public tasks$ = this._tasks.asObservable();
  public _pagination = new BehaviorSubject<Pagination>({page:0, pageSize:0, pageCount:0, total:0});
  private pagination$ = this._pagination.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();
  
  constructor(
    private router:Router,
    private toast:ToastController,
    public auth:AuthService,
    public tasks:TasksService,
    private media:MediaService,
    public favs:FavouritesService,
    private modal:ModalController
  ) { }

  private load(page:number=0, refresher:any=null){
  
    this.tasks.query("").subscribe({
      next:response=>{
        this._tasks.next(response.data);
        this._pagination.next(response.pagination);
        
        if(refresher)refresher.complete();
      },
      error:err=>{
        console.log(err);
      }
    });
  }
  ngOnInit() {
    this.auth.isLogged$.subscribe(logged=>{
      if(logged){
        this.load();
      }
    })
  }

  doRefresh(event:any){
    this.load(0, event.target);
  }

  doInfinite(event:any){
    this.load(this._pagination.value.page+1, event.target);
  }

  public onDeleteClicked(task:Task){
    var _task:Task = {...task};

    this.tasks.delete(_task).subscribe(
        {next: task=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`Task deleted`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        this.load();
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
        },
        error: err=>{
          console.log(err);
        }
      });
  }

  public async onCardClicked(task:Task){
    
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          if(info.data.picture){
            dataURLtoBlob(info.data.picture,(blob:Blob)=>{
              this.media.upload(blob).subscribe((media:any[])=>{
                info.data.picture = media[0];
                for (const [key, value] of Object.entries(info.data))
                  (task as any)[key]=value;
                this.tasks.update(task).subscribe(async user=>{
                  this.load();
                  const options:ToastOptions = {
                    message:"Task modified",
                    duration:1000,
                    position:'bottom',
                    color:'tertiary',
                    cssClass:'card-ion-toast'
                  };
                  const toast = await this.toast.create(options);
                  toast.present();
                });
              });
            });
          }
          else{
            if(info.data.picture=="")
              info.data.picture = null;
            for (const [key, value] of Object.entries(info.data))
              (task as any)[key]=value;
            this.tasks.update(task).subscribe(async user=>{
                this.load();
                const options:ToastOptions = {
                message:"Task modified",
                duration:1000,
                position:'bottom',
                color:'tertiary',
                cssClass:'card-ion-toast'
              };
              const toast = await this.toast.create(options);
              toast.present();
            });
          }
        }
        break;
        case 'delete':{
          this.tasks.delete(info.data).subscribe(async task=>{
            this.load();
            const options:ToastOptions = {
            message:"Task deleted",
            duration:1000,
            position:'bottom',
            color:'tertiary',
            cssClass:'card-ion-toast'
          };
          const toast = await this.toast.create(options);
          toast.present();
        })
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(task, onDismiss);
  }

  
  async presentForm(data:Task|null, onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component:TaskDetailComponent,
      componentProps:{
        task:data
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  onNewTask(){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          if(info.data.picture){
            dataURLtoBlob(info.data.picture,(blob:Blob)=>{
              this.media.upload(blob).subscribe((media:any[])=>{
                info.data.picture = media[0];
                this.tasks.add(info.data).subscribe(async task=>{
                    this.load();
                    const options:ToastOptions = {
                    message:"Task created",
                    duration:1000,
                    position:'bottom',
                    color:'tertiary',
                    cssClass:'card-ion-toast'
                  };
                  const toast = await this.toast.create(options);
                  toast.present();
                })
              });
            });
          }
          else
            this.tasks.add(info.data).subscribe(async task=>{
                this.load();
                const options:ToastOptions = {
                message:"Task created",
                duration:1000,
                position:'bottom',
                color:'tertiary',
                cssClass:'card-ion-toast'
              };
              const toast = await this.toast.create(options);
              toast.present();
            })
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(null, onDismiss);
  }



}
