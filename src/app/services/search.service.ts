import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private reponame: string = '';
  private username = 'muthangashem';
  private client_id = '6228816eae502586b23a';
  private client_secret = '02d3234aeae94509c9b75c42d35813c59e53dc9e';
  private token_key: string = 'fa2e3db99d8c17e5bba023a0c8986898a523e8dd';

  constructor(private _http: HttpClient) { }

  searchRepos(reponame: string): Observable<any> {
    return reponame ? this._http.get('https://api.github.com/search/repositories?q=' + reponame + '&per_page=100') : from([])
  }

}
