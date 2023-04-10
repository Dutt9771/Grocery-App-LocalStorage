import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  // In the search service

  private searchQuery = new BehaviorSubject<string>('');

  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  getSearchQuery(): BehaviorSubject<string> {
    return this.searchQuery;
  }
}

