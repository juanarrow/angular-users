import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighlightDirective {

  private _color:string = "transparent";
  @Input() set appHighLight(color:string){
    this._color = color;
  }
  get appHighLight():string{
    return this._color;
  }
  constructor(
    private el:ElementRef
  ) {
    this.unsetHighlight();
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setHighlight();
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.unsetHighlight();
  }

  private setHighlight(){
    this.el.nativeElement.classList.add('highlight');
  }
  private unsetHighlight(){
    this.el.nativeElement.classList.remove('highlight');
    }
}
