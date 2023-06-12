import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { MissionRequest } from '../model/MissionRequest.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  
  private missionRequest!: MissionRequest;
  public missionRequestChanged = new Subject<MissionRequest>();
  private diffDays!: number;

  setMissionRequest(data: MissionRequest) {
    this.missionRequest = data;
    this.missionRequestChanged.next(this.missionRequest);
  }

  getMissionRequest(): MissionRequest {
    return this.missionRequest;
  }
 
  setDiffDays(days: number): void {
    this.diffDays = days;
  }
  
  getDiffDays(): number {
    return this.diffDays;
  }
}