import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NbChatModule} from '../../@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule } from '../../@nebular/theme';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import { UsersService } from './services/users.service';
import { GroupChatService } from './services/group-chat.service';
import { MessagesService } from './services/messages.service';
import { DataService } from './services/data.service';
import { StatisticsService } from './services/statistics.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { GoogleChartsModule } from 'angular-google-charts';
 
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    DashboardComponent,
    GroupChatComponent,
    ProfileComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NbChatModule, BrowserAnimationsModule, NbThemeModule.forRoot({ name: 'corporate' }), 
    NbLayoutModule, 
    NbCardModule,
    MatGridListModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule, 
    LayoutModule,
    GoogleChartsModule.forRoot(),
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [DataService, UsersService, GroupChatService, MessagesService, StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
