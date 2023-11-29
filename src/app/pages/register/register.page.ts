import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  redirectUrl:string | null = 'home';
  constructor(
    private route:ActivatedRoute,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
  }

  onRegister(data:UserRegisterInfo){
    let _data:any = {...data};
    delete _data.confirm;
    
    this.auth.register(_data).subscribe({
      next:(data)=>{},
      error:(err)=>{}
    });
  }

}
