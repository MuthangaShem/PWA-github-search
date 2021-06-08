import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Item } from './../models/repo.model';
import { SearchService } from './../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns = ['name', 'owner', 'language', 'created_at', 'updated_at', 'open_issues', 'watchers_count', 'forks_count', 'size', 'license', 'html_url']
  dataSource: Item[] = [];
  searchTerm: string = ''

  constructor(private _search: SearchService) { }

  ngOnInit() {
  }

  search(event: Observable<string>) {
    event.pipe(
      switchMap((searchTerm) => {
        this.searchTerm = searchTerm;
        return searchTerm.length ?
          this._search.searchRepos(searchTerm) :
          of([])
      }),
      map(res => res.items))
      .subscribe(results => {
        console.log('results', results);
        this.dataSource = results;
      });
  }

}
