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
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Visa[]>(this.apiURL, { headers: httpHeaders });
  }

  listePass():Observable<Passport[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Passport[]>(this.apiURLPas, { headers: httpHeaders });
    }

    savePass(p: Passport):Observable<Passport> {
    const url = `${this.apiURL}/passport`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Passport>(url, p,{ headers: httpHeaders } );
    }


    deletePass(idPass: string) {
      const url = `${this.apiURL}/passport/${idPass}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.delete(url, { headers: httpHeaders });
    }

    updatePass(p: Passport) : Observable<Passport>{
      const url = `${this.apiURL}/passport`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.put<Passport>(url, p, { headers: httpHeaders });
    }

/*
  
 
  consulterPays(id: number): Observable<Pays> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Pays>(url, { headers: httpHeaders });
  }
 
  rechercherParContinent(idCat: number): Observable<Pays[]> {
    const url = `${this.apiURL}/paycont/${idCat}`;
    return this.http.get<Pays[]>(url);
  }
  rechercherParNom(nom: string):Observable< Pays[]> {
    const url = `${this.apiURL}/paysByName/${nom}`;
    return this.http.get<Pays[]>(url);
    }
    AddContinent( cat: Continent):Observable<Continent>{
      return this.http.post<Continent>(this.apiURLCat, cat, httpOptions);
      }
      
      */
}
