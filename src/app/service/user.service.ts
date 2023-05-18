import { Injectable } from '@angular/core';
import { Pays } from '../model/Pays.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { User } from '../model/User.model';
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

  ajouterPays(pay: Pays):Observable<Pays> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.post<Pays>(this.apiURL, pay, { headers: httpHeaders });
  }
  supprimerPays(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }
  consulterPays(id: number): Observable<Pays> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Pays>(url, { headers: httpHeaders });
  }
  updatePays(p: Pays) : Observable<Pays>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
   return this.http.put<Pays>(this.apiURL, p,  { headers: httpHeaders });
  }

}
