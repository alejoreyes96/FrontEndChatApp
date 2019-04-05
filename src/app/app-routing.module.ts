import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LogInComponent},

  { path: 'dashboard', component: DashboardComponent},
  { path: 'group-chat', component: GroupChatComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'register', component: RegisterComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
