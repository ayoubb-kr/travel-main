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
  roleapiURL: string = 'http://localhost:8090/visa/api/user/roles';
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

  updateUser(user: User) : Observable<User>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
   return this.http.put<User>(this.apiURL, user,  { headers: httpHeaders });
  }
  
  saveUser(user: User): Observable<User> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  return this.http.post<User>(`${this.apiURL}`, user, { headers: httpHeaders });
  }





  getRoles(): Observable<Role[]> {
    const url = `${this.roleapiURL}`; 
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Role[]>(url, { headers: httpHeaders });
  }
  deleterole(id: number){
    const url = `${this.roleapiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }
  saveRole(role: Role) : Observable<Role>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Role>(`${this.roleapiURL}`, role, { headers: httpHeaders });
  }
  updateRole(role: Role) : Observable<Role>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
   return this.http.put<Role>(this.roleapiURL, role,  { headers: httpHeaders });
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
