import { Injectable } from '@angular/core';
import { API_CONSTANTS } from '../constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse, UsersResponse } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = API_CONSTANTS.BASE_URL;

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users?page=${page}`);
  }

  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
