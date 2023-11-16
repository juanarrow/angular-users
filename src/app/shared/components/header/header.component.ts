import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() username:string|undefined = "Juan A. García";
  @Input() nickname:string|undefined = "juanarrow"
  @Input() languages:string[] = ["es","en"];
  @Input() languageSelected:string = "es";
  @Output() onSignout = new EventEmitter();
  @Output() onProfile = new EventEmitter();
  @Output() onLanguage = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  setLanguage(lang:string){
    this.languageSelected = lang;
    this.onLanguage.emit(lang);
  }

}
