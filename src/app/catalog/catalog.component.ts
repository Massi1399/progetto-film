import { Component, OnInit } from '@angular/core';
import { RetrievemoviesService } from '../retrievemovies.service';
import { FormControl , ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgFor, CommonModule } from '@angular/common';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
}

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  standalone : true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CatalogComponent implements OnInit {

  movies: Movie[] = [];
  filter: FormControl = new FormControl('');

  constructor(private movieService: RetrievemoviesService) { }

  ngOnInit(): void {
    this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.getMovies(value);
    });

    // Initial fetch with empty filter
    this.getMovies();
  }

  getMovies(filter: string = ''): void {
    this.movieService.getMovies(filter).subscribe(data => {
      this.movies = data;
    });
  }
}
