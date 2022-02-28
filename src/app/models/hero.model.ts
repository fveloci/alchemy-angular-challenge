import { Appearance } from "./appearance.model";
import { Biography } from "./biography.model";
import { Connections } from "./connections.model";
import { Powerstats } from "./powerstats.model";
import { Work } from "./work.model";
import { Image } from "./image.model";

export interface Hero {
  response: string;
  id: string;
  name: string;
  powerstats: Powerstats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
  image: Image;
}
