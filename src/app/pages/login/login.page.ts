import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from 'src/app/core/+state/auth/auth.facade';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  redirectUrl:string | null = 'home';
  constructor(
    private auth:AuthFacade,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
  }

  onLogin(credentials:UserCredentials){
    this.auth.login(credentials, this.redirectUrl??'/home');
  }
}
