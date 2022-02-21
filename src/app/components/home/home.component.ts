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
  addHeroForm = this.fb.group({
    heroId: ['', Validators.required]
  })
  constructor(private heroService: HeroService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getHeroById(2);
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
  addHeroToTeam() {
    const heroToAdd = this.addHeroForm.get('heroId')?.value;
    if(this.heroes.some(hero => hero.id == heroToAdd)) {
      alert('Este heroe ya existe')
      this.addHeroForm.reset()
      return
    }
    if(this.heroes.length == 6) {
      alert('No se pueden añadir mas heroes')
    } else {
      this.getHeroById(heroToAdd)
      this.addHeroForm.reset()
    }
  }
}
