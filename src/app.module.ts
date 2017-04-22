import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {VirtualScrollModule} from 'od-virtualscroll';

import {AppComponent} from './app.component';
import {RandomDataService} from './randomData/randomData.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,

    VirtualScrollModule
  ],
  providers: [RandomDataService]
})
export class AppModule {}
