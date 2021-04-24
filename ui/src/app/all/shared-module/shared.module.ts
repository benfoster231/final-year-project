import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderAfterLoginComponent } from '../layout/header/header-after-login/header-after-login.component';
import { HeaderBeforeLoginComponent } from '../layout/header/header-before-login/header-before-login.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderAfterLoginComponent,
    HeaderBeforeLoginComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderAfterLoginComponent,
    HeaderBeforeLoginComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ]
})
export class SharedModule {}
