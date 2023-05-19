import { Injectable } from '@angular/core';
import { Continent } from '../model/Continent.model';
import { Pays } from '../model/Pays.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContinentWrapper } from '../model/ContinentWrapper.model';
import { AuthServiceService } from './auth-service.service';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};
@Injectable({
  providedIn: 'root'
})
export class VisaService {
  pays: Pays[];
  Pay!: Pays;
  apiURL: string = 'http://localhost:8090/pays/api';
  apiURLCat: string = 'http://localhost:8090/pays/cat';
  
  constructor(private http : HttpClient, private authService: AuthServiceService) {
    

    this.pays = [];
  }
  ListPays(): Observable<Pays[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<Pays[]>(this.apiURL, { headers: httpHeaders });
  }

  ajouterPays(pay: Pays):Observable<Pays> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.post<Pays>(this.apiURL, pay, { headers: httpHeaders });
  }
  supprimerPays(user_id: number) {
    const url = `${this.apiURL}/${user_id}`;
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
  listeContinent():Observable<ContinentWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<ContinentWrapper>(this.apiURLCat, { headers: httpHeaders });
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
}
