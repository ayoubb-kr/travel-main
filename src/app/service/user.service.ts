import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { User } from '../model/User.model';
import { Role } from '../model/Role.model';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  User!: User;
  apiURL: string = 'http://localhost:8090/visa/api/user';
  constructor(private http : HttpClient, private authService: AuthServiceService) {
    this.users = [];

   
  }
  ListUsers(): Observable<User[]> {
    const url = `${this.apiURL}/all`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<User[]>(url, { headers: httpHeaders });
  }
  deleteUser(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

 

  getRoles(): Observable<Role[]> {
    const url = `${this.apiURL}/roles`; 
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Role[]>(url, { headers: httpHeaders });
  }

  saveUser(user: User): Observable<User> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<User>(`${this.apiURL}`, user, { headers: httpHeaders });
}

updateUser(user: User) : Observable<User>{
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt })
 return this.http.put<User>(this.apiURL, user,  { headers: httpHeaders });
}
/*
  consulterPays(id: number): Observable<Pays> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Pays>(url, { headers: httpHeaders });
  }
 
*/
}
