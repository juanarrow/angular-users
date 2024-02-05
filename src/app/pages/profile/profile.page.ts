import { Component, OnInit } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { MediaService } from 'src/app/core/services/api/media.service';
import { UsersService } from 'src/app/core/services/api/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:User|null = null;
  constructor(
    public auth:AuthService,
    public media:MediaService,
    private toast:ToastController
  ) { 
    this.auth.user$.subscribe(user=>this.user=user);
  }

  ngOnInit() {
  }

  onSave(data:any){
    if(data.picture){
      dataURLtoBlob(data.picture,(blob:Blob)=>{
        this.media.upload(blob).subscribe((media:any[])=>{
          data.picture = media[0];
          
          this.auth.updateUser(data).subscribe(async user=>{
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
      if(data.picture=="")
              data.picture = null;
      this.auth.updateUser(data).subscribe(async user=>{
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

}
