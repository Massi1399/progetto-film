import { Component, OnInit, Input} from '@angular/core';
import { RetrievemoviesService } from '../services/retrievemovies.service';
import { FormControl , ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgFor, CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  standalone : true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CatalogComponent implements OnInit {

  movies: Movie[] = [];
  @Input() filterText: string = '';
  @Input() filterType: string = '';

  constructor(private movieService: RetrievemoviesService) { }

  ngOnInit(): void {
    // Fetch movies with initial filterText and filterType
    this.getMovies(this.filterText, this.filterType);
  }

  getMovies(filterText: string = '', filterType: string = ''): void {
    this.movieService.getMovies(filterText, filterType).subscribe(data => {
      if (data.length === 0) {
        this.movies = [];
        return;
      }
      this.movies = data;
    });
  }
}
