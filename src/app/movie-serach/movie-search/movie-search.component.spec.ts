import { Observable } from 'rxjs/Rx';
import { Movie } from '../model/movie';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { MovieSearchService } from './movie-search.service';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieSearchComponent } from './movie-search.component';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  const testData = <Movie[]>[
    { 'title': 'Die Hard', 'year': '1988', 'imdbID': 'tt0095016', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzNmY2IwYzAtNDQ1NC00MmI4LThkOTgtZmVhYmExOTVhMWRkXkEyXkFqcGdeQXVyMTk5NDA3Nw@@._V1_SX300.jpg' },
    { 'title': 'Live Free or Die Hard', 'year': '2007', 'imdbID': 'tt0337978', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDQxMDE1OTg4NV5BMl5BanBnXkFtZTcwMTMzOTQzMw@@._V1_SX300.jpg' },
    { 'title': 'Die Hard with a Vengeance', 'year': '1995', 'imdbID': 'tt0112864', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BZjI0ZWFiMmQtMjRlZi00ZmFhLWI4NmYtMjQ5YmY0MzIyMzRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
    { 'title': 'Die Hard 2', 'year': '1990', 'imdbID': 'tt0099423', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzMzYzk3ZTEtZDg0My00MTY5LWE3ZmQtYzNhYjhjN2RhZGRjL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' },
    { 'title': 'Die Another Day', 'year': '2002', 'imdbID': 'tt0246460', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BODNkYmIwYTMtYzdhNy00YWE3LThkYmEtNzA5ZTE5YmVjYzZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg' },
    { 'title': 'A Good Day to Die Hard', 'year': '2013', 'imdbID': 'tt1606378', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcwNzgyNzUzOV5BMl5BanBnXkFtZTcwMzAwOTA5OA@@._V1_SX300.jpg' },
    { 'title': 'A Million Ways to Die in the West', 'year': '2014', 'imdbID': 'tt2557490', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0NDcyNjg0MV5BMl5BanBnXkFtZTgwMzk4NTA4MTE@._V1_SX300.jpg' },
    { 'title': 'Live and Let Die', 'year': '1973', 'imdbID': 'tt0070328', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI2NTY5MTYzMl5BMl5BanBnXkFtZTcwNzY5MDg0NA@@._V1_SX300.jpg' },
    { 'title': 'John Tucker Must Die', 'year': '2006', 'imdbID': 'tt0455967', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI3MDkwODQ3OV5BMl5BanBnXkFtZTcwNTE4NDQzMQ@@._V1_SX300.jpg' },
    { 'title': 'Romeo Must Die', 'year': '2000', 'imdbID': 'tt0165929', 'type': 'movie', 'poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5Nzg1MjA5M15BMl5BanBnXkFtZTYwNzAxNzg2._V1_SX300.jpg' }
  ];
  class MockSearchService {
    searchString: string;
    called: boolean;
    search(movieTitle: string): Observable<Movie[]> {
      this.searchString = movieTitle;
      this.called = true;
      return Observable.of(testData);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{ provide: MovieSearchService, useClass: MockSearchService }],
      declarations: [MovieSearchComponent, MovieListComponent, MovieListItemComponent]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the component search should call the MovieSearchService.search() method',
    async(inject([MovieSearchService], (service: MockSearchService) => {
      component.search('Die Hard');
      expect(service.called).toBeTruthy();
      expect(service.searchString).toEqual('Die Hard');
    })));
});
