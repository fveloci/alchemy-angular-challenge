import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesTeamComponent } from './heroes-team.component';

describe('HeroesTeamComponent', () => {
  let component: HeroesTeamComponent;
  let fixture: ComponentFixture<HeroesTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
