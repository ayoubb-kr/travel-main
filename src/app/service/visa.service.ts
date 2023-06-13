import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Visa } from '../model/Visa.model';
import { Passport } from '../model/Passport.model';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};
@Injectable({
  providedIn: 'root'
})
export class VisaService {
  
  visas!: Visa[];
  visa!: Visa;
  apiURL: string = 'http://localhost:8090/visa/api';
  apiURLPas: string = 'http://localhost:8090/visa/api/passport';
  
  constructor(private http : HttpClient, private authService: AuthServiceService) {
    
    this.visas = [];
  }
  ListVisa(): Observable<Visa[]> {
    const url = `${this.apiURL}/all`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Visa[]>(url, { headers: httpHeaders });
  }
  saveVisa(visa: Visa):Observable<Visa> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Visa>(this.apiURL, visa,{ headers: httpHeaders } );
    }
    updateVisa(visa: Visa) : Observable<Visa>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.put<Visa>(this.apiURL, visa, { headers: httpHeaders });
    }
    
    deleteVisa(idVisa: string) {
      const url = `${this.apiURL}/${idVisa}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.delete(url, { headers: httpHeaders });
    }
    getVisaByIdpass(id: string): Observable<Visa[]> {
      const url = `${this.apiURL}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.get<Visa[]>(url, { headers: httpHeaders });
    }
 
    getVisaById(id: string): Observable<Visa> {
      const url = `${this.apiURL}/id/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt });
      return this.http.get<Visa>(url, { headers: httpHeaders });
    }
    


    
  listePass():Observable<Passport[]>{
    const url = `${this.apiURLPas}/all`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Passport[]>(url, { headers: httpHeaders });
    }

    getPassportById(id: string) {
      const url = `${this.apiURLPas}/id/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.get<Passport>(url, { headers: httpHeaders });
    }

    savePass(p: Passport):Observable<Passport> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Passport>(this.apiURLPas, p,{ headers: httpHeaders } );
    }

    deletePass(idPass: string) {
      const url = `${this.apiURLPas}/${idPass}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.delete(url, { headers: httpHeaders });
    }

    updatePass(p: Passport) : Observable<Passport>{
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.put<Passport>(this.apiURLPas, p, { headers: httpHeaders });
    }

  getPassportByUserId(id: number) {
  const url = `${this.apiURLPas}/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  return this.http.get<Passport>(url, { headers: httpHeaders });
}



}
