import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { environment } from './../../environments/environment';
import { Tag } from './models';

const URL = `${environment.apiUrl}/tags`;

@Injectable({
  providedIn: 'root'
})
export class TagApiService {

  /** */
  private subject: ReplaySubject<Tag[]> = new ReplaySubject(1);

  private neverCalled = true;

  /** Constructor. */
  constructor(private readonly http: HttpClient) { }

  /** Returns all -cached- tags. */
  getAll(): Observable<Tag[]> {
    if (this.neverCalled) {
      this.neverCalled = false;

      this.http
          .get<Tag[]>(URL)
          .subscribe(d => this.subject.next(d));
    }

    return this.subject;
  }
}
