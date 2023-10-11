import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/interfaces/user';
import { zip } from 'rxjs';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from '../../shared/components/user-info/user-info.component';
import { FavouritesService } from '../../core/services/favourites.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserFormComponent } from 'src/app/shared/components/userform/userform.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  public loading:boolean = false;
  constructor(
    private router:Router,
    private toast:ToastController,
    public users:UsersService,
    public favs:FavouritesService,
    private modal:ModalController
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    zip(this.users.getAll(), this.favs.getAll()).subscribe(results=>{
      this.loading = false;
    })
  }

  public welcome(){
    this.router.navigate(['/welcome']);
  }


  public onFavClicked(user:User, event:UserInfoFavClicked){
    var obs = (event?.fav)?this.favs.addFav(user.id):this.favs.deleteFav(user.id);
    obs.subscribe({
      next:_=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User ${event.fav?'added to':'removed from'} favourites`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
      },
      error:err=>console.log(err)
    });
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

  public async onCardClicked(index:number){
    const options:ToastOptions = {
      message:"User clicked the card",
      duration:1000,
      position:'bottom',
      color:'tertiary',
      cssClass:'card-ion-toast'
    };
    const toast = await this.toast.create(options);
    toast.present();
  }

  
  async presentForm(onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component:UserFormComponent,
      componentProps:{

      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewUser(newUser:any){
    var onDismiss = (data:any)=>{
      console.log(data);
    }
    this.presentForm(onDismiss);
  }
  

}
