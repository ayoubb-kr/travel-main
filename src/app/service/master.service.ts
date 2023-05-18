import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  /*
  private deletUrl = "http://localhost:8085/user/users/{userid}";
  private baseUrl="http://localhost:8085/user/";
  constructor(private httpClient : HttpClient) { }
 data = this.findAll();
 
 getdata(){
  return this.data;
 }
  loginUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`${this.baseUrl}`+'login',user);
  }
 
  public findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`+'users');
  }

  public save(user: User) {
    return this.httpClient.post<User>(`${this.baseUrl}`+'users', user);
  }

  public delete(): Observable<User[]>{
    return this.httpClient.delete<User[]>(this.deletUrl);
  }
  */
  }
  