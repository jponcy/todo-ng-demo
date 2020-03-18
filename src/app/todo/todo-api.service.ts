import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CaseConverterService } from '../case-converter.service';
import { environment } from './../../environments/environment';
import { Tag, Todo, TodoDto } from './models';
import { TagApiService } from './tag-api.service';

const URL = `${environment.apiUrl}/todos`;

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  /** Constructor. */
  constructor(
      private readonly http: HttpClient,
      private readonly tagApi: TagApiService,
      private readonly caseConverter: CaseConverterService) { }

  /** Returns all todos. */
  getAll(): Observable<Todo[]> {
    return combineLatest([ this.http.get<TodoDto[]>(URL), this.tagApi.getAll() ])
      .pipe(
        tap(() => console.log('todo tap')), // TODO: Remove
        map(([todos, tags]) => todos.map(this.combineTodoWithTag(tags))),
        map(this.caseConverter.toCamelCase)
      );
  }

  /** Marks as complete the given todo. */
  complete(todo: Todo) {
    const url = `${URL}/${todo.id}/complete`;

    return combineLatest([ this.http.put<Todo>(url, {}), this.tagApi.getAll() ])
        .pipe(
          map(([t, tags]) => this.combineTodoWithTag(tags)(t)),
          map(this.caseConverter.toCamelCase)
        );
  }

  /** Marks as uncomplete the given todo. */
  uncomplete(todo: Todo) {
    return this.http
        .put<Todo>(`${URL}/${todo.id}/uncomplete`, {});
  }

  /** Deletes the given todo. */
  delete(todo: Todo) {
    return this.http.delete<void>(`${URL}/${todo.id}`);
  }

  clear() {
    return combineLatest([ this.http.delete<Todo[]>(`${URL}/clear`), this.tagApi.getAll() ])
        .pipe(
          map(([todos, tags]) => todos.map(this.combineTodoWithTag(tags))),
          map(this.caseConverter.toCamelCase)
        );
  }

  private combineTodoWithTag(tags: Tag[]) {
    return (todo: TodoDto) => ({
      ...todo,
      tags: todo.tags.map(tagId => tags.find((t: Tag) => tagId === t.id))
    });
  }
}
