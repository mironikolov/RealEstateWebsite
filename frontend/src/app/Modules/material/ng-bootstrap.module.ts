import { NgModule } from '@angular/core';
import { NgbPopoverModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbPopoverModule,
    NgbCarouselModule],
  exports: [NgbPopoverModule,
    NgbCarouselModule]
})
export class NgBootstrapModule { }