import { Passport } from "./Passport.model";

export class User{
    user_id?: number;
    username!:string ;
    password !: string ;
    roles!:string[];
    passport!: Passport;
    }