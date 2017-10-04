import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdListModule,
  MdButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MdNativeDateModule,
  MatRadioModule,
  MatSliderModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatChipsModule,
  MatTooltipModule} from '@angular/material';

import { SharedModule } from './shared/shared.module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MdListModule,
    MdButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MdNativeDateModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule,

    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
