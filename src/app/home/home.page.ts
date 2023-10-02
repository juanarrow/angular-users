import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]> = this._users.asObservable();

  
  
  constructor(
    private router:Router,
    private toast:ToastController
  ) {
  }

  ngOnInit(): void {
    
    var users:User[] = [
      {id: 1, name:"Juan A.", surname:"garcía gómez", age:46, fav:true},
      {id: 2, name:"Alejandro", surname:"garcía gómez", age:45, fav:true},
      {id: 3, name:"juan", surname:"garcía Valencia", age:4, fav:false},
      {id: 4, name:"María del Mar", surname:"Valencia Valencia", age:46, fav:true},
      {id: 5, name:"Lydia", surname:"garcía Robles", age:11, fav:false}
    ];
    this._users.next(users);
    
   
  }

  public welcome(){
    this.router.navigate(['/welcome']);
  }


  public onFavClicked(user:User, event:UserInfoFavClicked){
    //recibimos en user el usuario asociado a la tarjeta
    //recimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
    //creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    //buscamos el índice del usuario para modificar su propiedad fav
    var index = users.findIndex((_user)=>_user.id == user.id);
    if(index>=0)
      //actualizamos la propiedad fav con el valor que hemos recibido por el evento
      users[index].fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
    //notificamos un nuevo array de usuarios para que se renderice en la plantilla
    this._users.next([...users]); 
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
