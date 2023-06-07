import { Passport } from "./Passport.model";

export enum Status {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESSFUL = 'SUCCESSFUL',
    REJECTED = 'REJECTED'
  }
  
  export class VisaRequest {
    id?: number;
    passport!: Passport; 
    type!: string;
    destination!: string;
    status!: Status;
  }
  