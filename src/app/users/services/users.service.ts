import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('../../../assets/json/users.json');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('', user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/' + userId);
  }

  updateUser(userId: string | number, changes: Partial<User>): Observable<any> {
    return this.http.put('/' + userId, changes);
  }
}
