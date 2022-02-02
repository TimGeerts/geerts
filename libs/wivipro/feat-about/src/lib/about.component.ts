import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'geerts-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // TODO load from "database"
  private imagesMarriage = ['marriage500x500.png'];
  private imagesBirth = ['baby500x500.jpg', 'birth_feet.jpg'];
  private imagesPresentation = ['presentatiemateriaal.jpg'];
  private imagesGifts = ['gifts.jpg'];
  private imagesThanks = ['sugar.jpg'];

  imgMarriage = '';
  imgBirth = '';
  imgPresentation = '';
  imgGift = '';
  imgThanks = '';

  ngOnInit(): void {
    this.imgMarriage = this.getRandomImg('marriage');
    this.imgBirth = this.getRandomImg('birth');
    this.imgPresentation = this.getRandomImg('presentation');
    this.imgGift = this.getRandomImg('gifts');
    this.imgThanks = this.getRandomImg('thanks');
  }

  private getRandomImg(type: string): string {
    let arr = this.imagesGifts;
    switch (type) {
      case 'marriage': {
        arr = this.imagesMarriage;
        break;
      }
      case 'birth': {
        arr = this.imagesBirth;
        break;
      }
      case 'presentation': {
        arr = this.imagesPresentation;
        break;
      }
      case 'gifts': {
        arr = this.imagesGifts;
        break;
      }
      case 'thanks': {
        arr = this.imagesThanks;
        break;
      }
      default: {
        arr = this.imagesMarriage;
        break;
      }
    }
    const rngIdx = Math.floor(Math.random() * length);
    return `assets/${arr[rngIdx]}`;
  }
}
