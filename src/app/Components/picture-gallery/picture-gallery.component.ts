import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-gallery',
  templateUrl: './picture-gallery.component.html',
  styleUrls: ['./picture-gallery.component.scss']
})
export class PictureGalleryComponent implements OnInit {
  fileToUpload: File = null;
  math = Math;

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
  }

}
