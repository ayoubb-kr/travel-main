import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { MissionRequest } from '../model/MissionRequest.model';


@Injectable({
  providedIn: 'root'
})
export class MissionRequestService {
    MissionRequests: MissionRequest[];
    MissionRequest!: MissionRequest;
    apiURL: string = 'http://localhost:8090/visa/api/missionReq';
    constructor(private http : HttpClient, private authService: AuthServiceService) {
        this.MissionRequests = [];
      }
      ListMissionreq(): Observable<MissionRequest[]> {
        const url = `${this.apiURL}/all`;
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.get<MissionRequest[]>(url, { headers: httpHeaders });
       }
  
       addMissionRequest(missionReq: MissionRequest):Observable<MissionRequest> {
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.post<MissionRequest>(this.apiURL, missionReq,{ headers: httpHeaders } );
       }
  
       updateMissionRequest(missionReq: MissionRequest):Observable<MissionRequest>{
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.put<MissionRequest>(this.apiURL, missionReq,{ headers: httpHeaders });
         }

         deleteMissionRequest(id: number) {
          const url = `${this.apiURL}/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer " + jwt;
          let httpHeaders = new HttpHeaders({ "Authorization": jwt })
          return this.http.delete(url, { headers: httpHeaders });
         }
       


    }
