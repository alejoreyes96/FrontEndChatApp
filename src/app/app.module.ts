import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NbChatModule} from '../../node_modules/@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import { GroupChatService } from './services/group-chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    DashboardComponent,
    GroupChatComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NbChatModule, BrowserAnimationsModule, NbThemeModule.forRoot({ name: 'cosmic' }), NbLayoutModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule,
    HttpClientModule
  ],
  providers: [GroupChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
