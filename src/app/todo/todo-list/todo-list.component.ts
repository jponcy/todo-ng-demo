import { Component, OnInit } from '@angular/core';

import { TodoApiService } from '../todo-api.service';
import { Todo } from '../models';
import { TodoListFilter } from './todo-filter/todo-filter.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  /** List of entities. */
  private tasks: Todo[];

  /** List of entities to print. */
  filteredTasks: Todo[];

  /** Filters. */
  private filterValues: TodoListFilter;

  private readonly receiveTasks = (tasks: Todo[]) => {
    this.tasks = tasks;
    this.filterList();
  }

  /** Constructor. */
  constructor(private readonly api: TodoApiService) { }

  /** {@inheritdoc} */
  ngOnInit() {
    this.api
        .getAll()
        .subscribe(this.receiveTasks);
  }

  get totalNb(): number {
    return this.tasks.length;
  }

  /** Called when user click on a TODO item. */
  onClick(todo: Todo): void {
    if (todo.finishedAt) { // If already completed.
      this.api
          .uncomplete(todo)
          .subscribe(() => todo.finishedAt = null);
    } else {
      this.api
          .complete(todo)
          .subscribe(t => this.tasks[this.tasks.indexOf(todo)] = t);
    }
  }

  /** Called when user click on a cross beside the todo. */
  onDelete(todo: Todo, event: MouseEvent): void {
    event.stopPropagation();

    this.api
        .delete(todo)
        .subscribe(() => [this.tasks, this.filteredTasks].forEach(l => l.splice(l.indexOf(todo), 1)));
  }

  /** Called when user edit the filter form. */
  onFilter(values: TodoListFilter): void {
    this.filterValues = values;
    this.filterList();
  }

  onClear(): void {
    this.api
        .clear()
        .subscribe(this.receiveTasks);
  }

  /** Uses {@link #tasks} & {@link #filterValues} to fill the {@link #filterTasks}. */
  private filterList(): void {
    if (this.tasks) {
      if (this.filterValues) {
        const label = this.escape(this.filterValues.label.toLowerCase());
        const tags  = this.filterValues.tags;

        this.filteredTasks = this.tasks
            .filter(t => (!label || this.escape(t.label).includes(label))
                && (!tags || !tags.length || t.tags.some(tag => tags.includes(tag.id))));
      } else {
        this.filteredTasks = this.tasks;
      }
    }
  }

  private escape(value: string) {
    return value
        .replace(/[àâ]/g, 'a')
        .replace(/[éè^eë]/g, 'e');
  }
}
