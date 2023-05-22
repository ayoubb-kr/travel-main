import { Passport } from "./Passport.model";

export class Visa{
    idVisa!: string;
    visaExpDate!: Date;
    jours!: number;
    mois!: number;
    passport!: Passport;
 
    }