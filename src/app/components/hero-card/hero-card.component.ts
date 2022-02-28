import { Hero } from 'src/app/models/hero.model';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.sass']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero = {} as Hero
  @Output() heroToDelete: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {

  }

  deleteHero(id: string) {
    this.heroToDelete.emit(id);
  }
  destroyModal() {
    let modal = document.getElementById('exampleModal')
  }
}
