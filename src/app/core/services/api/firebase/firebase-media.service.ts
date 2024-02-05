import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, of, tap } from 'rxjs';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { UserRegisterInfo } from '../../../interfaces/user-register-info';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { StrapiArrayResponse, StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiMe, StrapiRegisterPayload, StrapiRegisterResponse, StrapiResponse, StrapiUploadResponse, StrapiUser } from '../../../interfaces/strapi';
import { User } from '../../../interfaces/user';
import { MediaService } from '../media.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { Media } from 'src/app/core/interfaces/media';

export class FirebaseMediaService extends MediaService{

  constructor(
    private firebase:FirebaseService
  ) { 
    super();
  }
  public upload(blob:Blob):Observable<Media[]>{
    return new Observable(obs=>{
      this.firebase.imageUpload(blob).then(data=>{
        var imgs = [];
        var media:Media= {
          id:0,
          url_large:data.file,
          url_medium:data.file,
          url_small:data.file,
          url_thumbnail:data.file
        };
        
        imgs.push(media);
        obs.next(imgs);
      })
    });
  }

}
