import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/reducers/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/effects/user.effects';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { RouterModule } from '@angular/router';
import {UserResolver} from './services/user.resolver';
import { HttpClientModule } from '@angular/common/http';
const routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: UserResolver
    }
  },
  {path: 'create-user', component: CreateUserComponent},
  // {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('users',userReducer),
    EffectsModule.forRoot([UserEffects])
  ],
  providers:[UserResolver]
})
export class UsersModule { }
