import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class RetrievemoviesService {

  private moviesUrl = './movies.json';

  constructor(private http: HttpClient) { }

  getMovies(filter: string = ''): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      map(movies => movies.filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase())))
    );
  }
}
