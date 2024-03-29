import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ModalService } from './services/modal/modal.service';
import { AuthService } from './services/auth.service';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './services/guards/auth.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoadingbuttonDirective } from './loadingbutton/loadingbutton.directive';
import { ErrorInterceptor } from './services/interceptors/error.interceptor';
import { ConfirmDeleteModalComponent } from './services/modal/templates/confirm-delete.modal';
import { ConfirmResetModalComponent } from './services/modal/templates/confirm-reset.modal';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageViewerComponent } from './image-grid/image-viewer/image-viewer.component';

export * from './utils';
export * from './types/menu-item';
export * from './types/fsTypes';
export * from './types/gallery-image';
export * from './services/notification.service';
export * from './services/modal/modal.service';
export * from './services/auth.service';
export * from './services/guards/auth.guard';
export * from './services/guards/admin.guard';
export * from './services/interceptors/error.interceptor';
export * from './services/functions/types';
export * from './services/functions/auth/auth.functions';
export * from './services/functions/user/user.functions';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    ToastrModule.forRoot({
      enableHtml: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  declarations: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
    ImageGridComponent,
    SearchComponent,
    SkeletonLoaderComponent,
    LoadingbuttonDirective,
    ConfirmDeleteModalComponent,
    ConfirmResetModalComponent,
    ImageViewerComponent,
  ],
  exports: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
    ImageGridComponent,
    SearchComponent,
    SkeletonLoaderComponent,
    LoadingbuttonDirective,
  ],
  providers: [
    ModalService,
    AuthService,
    ErrorInterceptor,
    AuthGuard,
    AdminGuard,
  ],
})
export class SharedModule {}
