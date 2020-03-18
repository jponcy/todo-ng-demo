import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Tag } from '../../models';
import { TagApiService } from '../../tag-api.service';

export interface TodoListFilter {
  label: string;
  tags: number[];
}

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {

  @Output()
  filter = new EventEmitter<TodoListFilter>();

  /** The availables tags. */
  tags: Tag[];

  /** The form. */
  readonly form = this.fb.group({
    label: '',
    tags: null
  });

  /** Functions called to emit a filter event to parent. */
  private readonly sendFilter = (values: TodoListFilter) => {
    // values.label = values.label.toLowerCase();
    this.filter.emit(values);
  }

  /** Constructor. */
  constructor(
      private readonly fb: FormBuilder,
      private readonly tagApi: TagApiService) { }

  /** {@inheritdoc} */
  ngOnInit() {
    this.tagApi
        .getAll()
        .subscribe(tags => this.tags = tags);

    this.form
        .valueChanges
        .subscribe(this.sendFilter);
  }
}
