import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGallery]'
})
export class GalleryDirective {
  lastIndex: any;
  lastElement: any;

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: any){
    if (this.lastElement != null) {
      this.lastElement.classList.remove("border");
      this.lastElement.classList.remove("border-primary");
    }
    event.srcElement.classList.add("border");
    event.srcElement.classList.add("border-primary");
    this.lastElement = event.srcElement
    
    
  }

}
