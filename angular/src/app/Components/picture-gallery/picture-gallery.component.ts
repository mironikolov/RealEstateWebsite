import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-gallery',
  templateUrl: './picture-gallery.component.html',
  styleUrls: ['./picture-gallery.component.scss']
})
export class PictureGalleryComponent implements OnInit {
  fileToUpload: File = null;
  math = Math;
  index: number = 0;

  imagesUrlArr = new Array<SafeUrl>();
  @Input() set setImagesUrlArr( imagesUrlArr: [SafeUrl] ){
    if ( imagesUrlArr != null  ) {
      this.imagesUrlArr = imagesUrlArr;
    }
  }

  pictureRowItems:number = 4;
  @Input() set setPictureRowItems( pictureRowItems ){
    this.pictureRowItems = pictureRowItems;
  };

  constructor() { }

  ngOnInit() {
    
  }

  onImageClick( e ){
    this.index = e.srcElement.dataset.arrayIndex
  }
}
