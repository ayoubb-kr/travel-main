import { Passport } from "./Passport.model";
import { User } from "./User.model";
import { Visa } from "./Visa.model";

export enum RequestStatus {
    WAITING, REJECTED, IN_PROGRESS, ACCEPTED
}

export interface MissionRequest {
    id: number;
    username:  User;
    passportId: Passport;
    visaId: Visa;
    dateDep: Date;
    dateRet: Date;
    days: number;
    missionObject: string;
    departureCity: string;
    arrivalCity: string;
    status: RequestStatus;
    budget: number;
    feadback: string;
}