import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-heroes-team',
  templateUrl: './heroes-team.component.html',
  styleUrls: ['./heroes-team.component.sass']
})
export class HeroesTeamComponent implements OnInit {

  @Input() teamHeroes: Hero[] = [];
  teamPower: any;
  teamHeight: number = 0;
  teamWeight: number = 0;
  teamType =  {
    "combat": 0,
    "intelligence": 0,
    "speed": 0,
    "durability": 0,
    "power": 0,
    "strength": 0
  }

  constructor() { }
  ngOnInit(): void {
  }

  deleteHero(id: string) {
    const removeIndex = this.teamHeroes.findIndex(hero => hero.id === id);
    this.teamHeroes.splice(removeIndex, 1);
  }

  calculateTeamType() {
    let teamType = {
      combat: 0,
      intelligence: 0,
      speed: 0,
      durability: 0,
      power: 0,
      strength: 0
    }
    this.teamHeroes.forEach(hero => {
      hero.powerstats.combat !== "null" ?  teamType.combat += +hero.powerstats.combat : teamType.combat
      hero.powerstats.intelligence !== "null" ?  teamType.intelligence += +hero.powerstats.intelligence : teamType.intelligence
      hero.powerstats.speed !== "null" ?  teamType.speed += +hero.powerstats.speed : teamType.speed
      hero.powerstats.durability !== "null" ?  teamType.durability += +hero.powerstats.durability : teamType.durability
      hero.powerstats.power !== "null" ?  teamType.power += +hero.powerstats.power : teamType.power
      hero.powerstats.strength !== "null" ?  teamType.strength += +hero.powerstats.strength : teamType.strength
    })
    this.teamType = teamType
    this.calculateTeamHeightAndWeight();
    return this.getMaxValueKey(teamType)
  }

  getMaxValueKey(obj: {[key: string]: number}): string {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
  }

  calculateTeamHeightAndWeight() {
    let weight = 0
    let height = 0
    this.teamHeroes.forEach(hero => {
      if(hero.appearance.weight[1] != null) {
        // @ts-ignore
        const heroWeight = +hero.appearance.weight[1].match(/\d+/)[0]
        weight += heroWeight
      }
      if(hero.appearance.height[1] != null) {
        // @ts-ignore
        const heroHeight = +hero.appearance.height[1].match(/\d+/)[0]
        height += heroHeight
      }
    })
    this.teamHeight = height / this.teamHeroes.length
    this.teamWeight = weight / this.teamHeroes.length
  }
}
