import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info.component';
import { UsersService } from '../users.service';


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
    public users:UsersService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.users.getAll().subscribe(users=>{
      this.loading = false;
    });
  }

  public welcome(){
    this.router.navigate(['/welcome']);
  }


  public onFavClicked(user:User, event:UserInfoFavClicked){
    var _user:User = {...user};
    _user.fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
    this.users.updateUser(_user).subscribe(
        {next: user=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
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

  public async onCardClicked(){
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

}
