import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  exports: [
    NgxSpinnerModule,
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegularModule { }
