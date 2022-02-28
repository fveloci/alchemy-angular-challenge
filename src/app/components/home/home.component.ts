import { HeroService } from './../../services/hero/hero.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Hero} from "../../models/hero.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  heroes: Hero[] = [];
  constructor(private heroService: HeroService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }

  getHeroById(id: number) {
    this.heroService.getHeroById(id).subscribe({
      next: async (res) => {
        const resHero = await res;
        this.heroes.push(resHero)
      },
      error: () => {

      },
      complete: () => {
        console.log('Hero getter')
      }
    })
  }
  addHeroToTeam(newHero: Hero) {
    const goodHeroes = this.heroes.filter(hero => hero.biography.alignment === 'good')
    const badHeroes = this.heroes.filter(hero => hero.biography.alignment === 'bad' || hero.biography.alignment === 'neutral')

    if(newHero.biography.alignment === 'bad' && badHeroes.length == 3) {
      alert('You can´t add more than 3 bad heroes')
      return;
    }
    if(newHero.biography.alignment === 'good' && goodHeroes.length == 3) {
      alert('You can´t add more than 3 good heroes')
      return;
    }
    if(this.heroes.some(hero => hero.id == newHero.id)) {
      alert('This hero is actually in your team')
      return
    }
    if(this.heroes.length == 6) {
      alert('You can´t add more than 6 heroes')
      return
    }
    this.heroes.push(newHero)

  }
}
