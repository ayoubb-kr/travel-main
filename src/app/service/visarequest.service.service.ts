import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { VisaRequest } from '../model/VisaRequest.model';
@Injectable({ providedIn: 'root' })
export class VisaRequestService {

    visareqs!: VisaRequestService[];
    visareq!: VisaRequestService;
   private apiURL = 'http://localhost:8090/visa/api/req'; 

  constructor(private http : HttpClient, private authService: AuthServiceService) {
    
    this.visareqs = [];
  }

    ListVisareq(): Observable<VisaRequest[]> {
     const url = `${this.apiURL}/all`;
     let jwt = this.authService.getToken();
     jwt = "Bearer " + jwt;
     let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.get<VisaRequest[]>(url, { headers: httpHeaders });
    }
    addVisaRequest(visaReq: VisaRequest):Observable<VisaRequest> {
     let jwt = this.authService.getToken();
     jwt = "Bearer " + jwt;
     let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.post<VisaRequest>(this.apiURL, visaReq,{ headers: httpHeaders } );
    }

    updateVisaRequest(visaReq: VisaRequest):Observable<VisaRequest>{
     let jwt = this.authService.getToken();
     jwt = "Bearer " + jwt;
     let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.put<VisaRequest>(this.apiURL, visaReq,{ headers: httpHeaders });
      }
      
    deleteVisaRequest(id: number) {
     const url = `${this.apiURL}/${id}`;
     let jwt = this.authService.getToken();
     jwt = "Bearer " + jwt;
     let httpHeaders = new HttpHeaders({ "Authorization": jwt })
     return this.http.delete(url, { headers: httpHeaders });
    }
  
  
}