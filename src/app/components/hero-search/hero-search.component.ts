import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Hero} from "../../models/hero.model";
import {HeroService} from "../../services/hero/hero.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {
  heroSearch = this.fb.group({
    name: ['', Validators.required]
  })
  heroesFound: Hero[] = [] as Hero[]
  notFound: boolean = false;
  @Output() heroToTeam: EventEmitter<Hero> = new EventEmitter<Hero>()

  constructor(private fb: FormBuilder,
              private heroService: HeroService) { }

  ngOnInit(): void {
  }

  searchHero() {
    this.heroesFound = [];
    this.notFound = false;
    const name = this.heroSearch.get('name')!.value
    this.heroService.getHeroByName(name).subscribe({
      next: data => {
        if(data.response == 'error') {this.notFound = true;}
        else {
           this.heroesFound = data.results;
         }
        },
      error: err => {
        console.log(err)
      },
      complete: () => {}
    })
  }

  addHeroToTeam(hero: Hero) {
    this.heroToTeam.emit(hero);
  }
}
