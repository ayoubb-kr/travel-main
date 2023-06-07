import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  apiURLrole: string = 'http://localhost:8090/visa/api/user/roles';
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

getUserByname(username: string): Observable<User> {
  const url = `${this.apiURL}/name/${username}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  return this.http.get<User>(url, { headers: httpHeaders });
}

getUserById(user_id: number): Observable<User> {
  const url = `${this.apiURL}/${user_id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  return this.http.get<User>(url, { headers: httpHeaders });
}

getLoggedUserData(): Observable<User | null> {
  const username = this.authService.getCurrentUser();
  if (username) {
    return this.getUserByname(username);
  } else {
    return of(null);
  }
}




  getRoles(): Observable<Role[]> {
    const url = `${this.apiURLrole}/all`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Role[]>(url, { headers: httpHeaders });
  }
  deleterole(id: number){
    const url = `${this.apiURLrole}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }
  saveRole(role: Role) : Observable<Role>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Role>(`${this.apiURLrole}`, role, { headers: httpHeaders });
  }
  updateRole(role: Role) : Observable<Role>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
   return this.http.put<Role>(this.apiURLrole, role,  { headers: httpHeaders });
  }


}
