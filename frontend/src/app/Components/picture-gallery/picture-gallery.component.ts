import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-gallery',
  templateUrl: './picture-gallery.component.html',
  styleUrls: ['./picture-gallery.component.scss']
})
export class PictureGalleryComponent implements OnInit {
  public fileToUpload: File = null;
  public math = Math;
  public index: number = 0;

  public imagesUrlArr = new Array<SafeUrl>();
  @Input() set setImagesUrlArr( imagesUrlArr: [SafeUrl] ){
    if ( imagesUrlArr != null  ) {
      this.imagesUrlArr = imagesUrlArr;
    }
  }

  public pictureRowItems:number = 4;
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
