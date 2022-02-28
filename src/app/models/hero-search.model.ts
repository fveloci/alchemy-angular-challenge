import {Hero} from "./hero.model";

export interface HeroSearch {
  response: string;
  'results-for': string;
  results: Hero[]
}
