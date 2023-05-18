import { Continent } from "./Continent.model";

export class ContinentWrapper{
    _embedded!:{continents: Continent[]}
}