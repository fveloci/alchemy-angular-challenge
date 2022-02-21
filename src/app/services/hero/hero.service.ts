import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hero } from 'src/app/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${environment.API_URL}/${id}`);
  }
}
