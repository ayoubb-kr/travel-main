import { Passport } from "./Passport.model";
import { User } from "./User.model";
import { Visa } from "./Visa.model";

export enum RequestStatus {
    WAITING ='WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESSFUL = 'SUCCESSFUL',
    REJECTED = 'REJECTED'
}

export class MissionRequest {
    id: number;
    user: User;
    passport: Passport;
    visa: Visa;
    dateDep: Date;
    dateRet: Date;
    days: number;
    missionObject: string;
    departureCity: string;
    arrivalCity: string;
    status: RequestStatus;
    budget: number;
    feadback: string;

    constructor() {
        this.id = 0;
        this.user = new User(); 
        this.passport = new Passport(); 
        this.visa = new Visa(); 
        this.dateDep = new Date();
        this.dateRet = new Date();
        this.days = 0;
        this.missionObject = '';
        this.departureCity = '';
        this.arrivalCity = '';
        this.status = RequestStatus.WAITING;
        this.budget = 0;
        this.feadback = '';
    }
}