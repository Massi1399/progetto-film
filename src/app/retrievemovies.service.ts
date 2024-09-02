import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import e from 'express';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
  productionYear: number;
  productionCompany: string;
  genre: string;
  duration: number;
  director: string;
}

@Injectable({
  providedIn: 'root'
})
export class RetrievemoviesService {

  private moviesUrl = 'assets/movies.json';

  constructor(private http: HttpClient) { }

  getMovies(filterText: string = '', filterType: string = ''): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      map(movies => {
        if (filterType === 'title') {
          return movies.filter(movie => movie.title.toLowerCase().includes(filterText.toLowerCase()));
        } else if (filterType === 'genre') {
          return movies.filter(movie => movie.genre.toLowerCase().includes(filterText.toLowerCase()));
        } else if (filterType === 'director') {
          return movies.filter(movie => movie.director.toLowerCase().includes(filterText.toLowerCase()));
        } 
          else if (filterType === 'productionYear') {
          return movies.filter(movie => movie.productionYear.toString().includes(filterText));
        } else {
          return movies;
        }
      })
    );
  }
}
