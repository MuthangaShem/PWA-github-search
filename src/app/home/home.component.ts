import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  isLoadingResults: boolean = false;
  noResults = false;

  constructor(private _search: SearchService) { }

  ngOnInit() {
  }

  search(event: Observable<string>) {
    event.pipe(
      switchMap((searchTerm) => {
        this.searchTerm = searchTerm;
        if (searchTerm.length) {
          this.isLoadingResults = true;
        } else {
          this.isLoadingResults = false;
          this.noResults = false;
        }
        return this._search.searchRepos(searchTerm)
      }),
      map(res => res === [] ? [] : res.items))
      .subscribe(results => {
        console.log('results', results);
        !results.length
          ? this.noResults = true
          : this.noResults = false;
        this.isLoadingResults = false;
        this.dataSource = results;
      });
  }

}
