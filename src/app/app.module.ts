import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { BackComponent } from './screens/back/back.component';
import { OtpComponent } from './screens/otp/otp.component';
import { BtnComponent } from './components/btn/btn.component';
import { HomeComponent } from './screens/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { UserTileComponent } from './components/user-tile/user-tile.component';
import { RcvdTileComponent } from './components/rcvd-tile/rcvd-tile.component';
import { SentTileComponent } from './components/sent-tile/sent-tile.component';
import { CheckedContComponent } from './components/checked-cont/checked-cont.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackComponent,
    OtpComponent,
    BtnComponent,
    HomeComponent,
    TopBarComponent,
    UserTileComponent,
    RcvdTileComponent,
    SentTileComponent,
    CheckedContComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
