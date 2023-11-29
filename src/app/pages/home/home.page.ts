import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/interfaces/user';
import { BehaviorSubject, zip } from 'rxjs';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from '../../shared/components/user-info/user-info.component';
import { FavouritesService } from '../../core/services/favourites.service';
import { UsersService } from 'src/app/core/services/api/users.service';
import { UserDetailComponent } from 'src/app/shared/components/user-detail/user-detail.component';
import { Pagination } from 'src/app/core/interfaces/data';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { MediaService } from 'src/app/core/services/api/media.service';
import { AuthService } from 'src/app/core/services/api/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  private _users = new BehaviorSubject<User[]>([]);
  public users$ = this._users.asObservable();
  public _pagination = new BehaviorSubject<Pagination>({page:0, pageSize:0, pageCount:0, total:0});
  private pagination$ = this._pagination.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  constructor(
    private router:Router,
    private toast:ToastController,
    public auth:AuthService,
    public users:UsersService,
    private media:MediaService,
    public favs:FavouritesService,
    private modal:ModalController
  ) {
    
  }

  private loadUsers(page:number=0, refresher:any=null){
  
    this.users.query("").subscribe({
      next:response=>{
        this._users.next(response.data);
        this._pagination.next(response.pagination);
        
        if(refresher)refresher.complete();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.auth.isLogged$.subscribe(logged=>{
      if(logged){
        this.loadUsers();
      }
    })
  }

  doRefresh(event:any){
    this.loadUsers(0, event.target);
  }

  doInfinite(event:any){
    this.loadUsers(this._pagination.value.page+1, event.target);
  }

  public onDeleteClicked(user:User){
    var _user:User = {...user};

    this.users.deleteUser(_user).subscribe(
        {next: user=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User deleted`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
        },
        error: err=>{
          console.log(err);
        }
      });
  }

  public async onCardClicked(user:User){
    
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          if(info.data.picture){
            dataURLtoBlob(info.data.picture,(blob:Blob)=>{
              this.media.upload(blob).subscribe((media:number[])=>{
                info.data.picture = media[0];
                let _user = {id:user.id, ...info.data};
                this.users.updateUser(_user).subscribe(async user=>{
                  this.loadUsers();
                  const options:ToastOptions = {
                    message:"User modified",
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
            this.users.updateUser(info.data).subscribe(async user=>{
                this.loadUsers();
                const options:ToastOptions = {
                message:"User modified",
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
          this.users.deleteUser(info.data).subscribe(async user=>{
            this.loadUsers();
            const options:ToastOptions = {
            message:"User deleted",
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
    this.presentForm(user, onDismiss);
  }

  
  async presentForm(data:User|null, onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component:UserDetailComponent,
      componentProps:{
        user:data
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

  onNewUser(){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          if(info.data.picture){
            dataURLtoBlob(info.data.picture,(blob:Blob)=>{
              this.media.upload(blob).subscribe((media:number[])=>{
                info.data.picture = media[0];
                this.users.addUser(info.data).subscribe(async user=>{
                    this.loadUsers();
                    const options:ToastOptions = {
                    message:"User created",
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
            this.users.addUser(info.data).subscribe(async user=>{
                this.loadUsers();
                const options:ToastOptions = {
                message:"User created",
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
