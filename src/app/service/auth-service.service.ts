import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/User.model';
import { Role } from '../model/Role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


                   public loggedUser!:string;
                 
                   public loggedUserId! : number;
                   public isloggedIn: Boolean = false;
                   public roles!:string[];
                   private helper = new JwtHelperService();

                   apiURL: string = 'http://localhost:8090/visa';
                   token!:string;
  constructor(private router : Router, private http : HttpClient) {this.loadToken();}

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
    }
    decodeJWT()
    { if (this.token == undefined)
     return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    }

    loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.decodeJWT();
    } else {
      this.router.navigate(['/']);
    }
    }

  getToken(): string{
    return this.token;
  }
  setLoggedUser(username: string) {
    this.loggedUser = username;
  }

   logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
    }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

getUserRoles(): string[] {
  const token = this.getToken();
  const decodedToken = this.helper.decodeToken(token);
  return decodedToken.roles; 
}

getCurrentUser(): string {
  const token = this.getToken();
  if (!token) {
    this.router.navigate(['/']);
  }
  const decodedToken = this.helper.decodeToken(token);
  return decodedToken.sub;
}
getCurrentUserId(): number | null {
  const token = this.getToken();
  if (!token) {
    this.router.navigate(['/']);
    return null;
  }
  const decodedToken = this.helper.decodeToken(token);
  return decodedToken.user_id; 
}
}
