import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from 'src/app/core/+state/auth/auth.facade';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  redirectUrl:string | null = 'home';
  constructor(
    private auth:AuthFacade,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
  }

  onRegister(data:UserRegisterInfo){
    let _data:any = {...data};
    delete _data.confirm;
    
    this.auth.register(_data, this.redirectUrl??'/home');
  }

}
