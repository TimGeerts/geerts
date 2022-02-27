import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGalleryImage, ModalService } from '@geerts/shared';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { AddImageModalComponent } from './modals/add-image.modal';
import { DeleteImageModalComponent } from './modals/delete-image.modal';
import { EditImageModalComponent } from './modals/edit-image.modal';

@Component({
  selector: 'geerts-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  gallery: IGalleryImage[] = new Array<IGalleryImage>();
  title = '';
  assetsfolder = '';
  canmanage = true;

  modalOptions: NgbModalOptions = { size: 'lg' };

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.title = data.title;
      this.assetsfolder = `galleries/${data.folder}/`;
      this.initGallery();
    });
  }

  addImage = (): void => {
    //callback code here
    console.log('add image');

    this.modalService
      .show<AddImageModalComponent, boolean>(
        AddImageModalComponent,
        undefined,
        this.modalOptions
      )
      .pipe(take(1))
      .subscribe((res) => {
        console.log(JSON.stringify(res, null, 1));
      });
  };

  editImage = (img: IGalleryImage): void => {
    //callback code here
    console.log('edit image', img);

    this.modalService
      .show<EditImageModalComponent, boolean>(
        EditImageModalComponent,
        { img },
        this.modalOptions
      )
      .pipe(take(1))
      .subscribe((res) => {
        console.log(JSON.stringify(res, null, 1));
      });
  };

  deleteImage = (img: IGalleryImage): void => {
    //callback code here
    console.log('delete image', img);

    this.modalService
      .show<DeleteImageModalComponent, boolean>(
        DeleteImageModalComponent,
        { img },
        this.modalOptions
      )
      .pipe(take(1))
      .subscribe((res) => {
        console.log(JSON.stringify(res, null, 1));
      });
  };

  //https://picsum.photos/150?random=1
  private initGallery(): void {
    console.log('init gallery');
    for (let i = 0; i < 100; i++) {
      this.gallery.push({
        fileName: `https://picsum.photos/150?random=${i}`,
      });
    }
  }
}
