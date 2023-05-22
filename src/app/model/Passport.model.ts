import { Visa } from "./Visa.model";

export class Passport {
    idPass!: string;
    passExpDate!: Date;
    visas!: Visa[];
}