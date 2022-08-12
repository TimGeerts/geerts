import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthGuard } from './services/auth.guard';

export * from './types/menu-item';
export * from './types/user';
export * from './types/gallery-image';
export * from './services/notification.service';
export * from './services/modal.service';
export * from './services/auth.service';
export * from './services/auth.guard';
export * from './services/firestore/users/user.service';
export * from './services/api/auth/auth.api';
export * from './services/api/users/user.api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
    ImageGridComponent,
    SkeletonLoaderComponent,
  ],
  exports: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
    ImageGridComponent,
    SkeletonLoaderComponent,
  ],
  providers: [ModalService, AuthService, AuthGuard],
})
export class SharedModule {}
