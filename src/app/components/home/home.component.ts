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

    if(this.heroes.some(hero => hero.id == newHero.id)) {
      alert('Este heroe ya existe')
      return
    }
    if(this.heroes.length == 6) {
      alert('No se pueden añadir mas heroes')
    } else {
      this.heroes.push(newHero)
    }
  }
}
