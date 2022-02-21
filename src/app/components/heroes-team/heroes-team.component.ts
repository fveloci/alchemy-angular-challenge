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
  teamType: string = 'Intelligence'

  constructor() { }
  ngOnInit(): void {
    console.log(this.teamHeroes)
    this.teamPower = {
      combat: 0,
      intelligence: 0,
      speed: 0,
      durability: 0,
      power: 0,
      strength: 0
    }
  }

  deleteHero(id: string) {
    const removeIndex = this.teamHeroes.findIndex(hero => hero.id === id);
    this.teamHeroes.splice(removeIndex, 1);
  }

  calculateTeamType() {
    this.teamHeroes.forEach(hero => {
      this.teamPower.combat += +hero.powerstats.combat
      this.teamPower.intelligence += +hero.powerstats.intelligence
      this.teamPower.speed += +hero.powerstats.speed
      this.teamPower.durability += +hero.powerstats.durability
      this.teamPower.power += +hero.powerstats.power
      this.teamPower.strength += +hero.powerstats.strength
    })
    this.calculateTeamHeightAndWeight();
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
