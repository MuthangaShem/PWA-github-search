import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  @Output() results = new EventEmitter<Observable<string>>();

  @ViewChild('input', { static: true }) input!: ElementRef;

  ngOnInit() {
    this.searchMethod();
  }

  ngAfterViewInit() {
  }

  searchMethod() {
    this.results.emit(
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          map(searchValue => this.input.nativeElement.value.trim()),
          distinctUntilChanged()
        )
    );
  }

}
