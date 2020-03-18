import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { TodoFilterComponent } from './todo-list/todo-filter/todo-filter.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [TodoListComponent, TodoFilterComponent],
  imports: [
    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    ReactiveFormsModule,
    CommonModule
  ],
  exports: [TodoListComponent]
})
export class TodoModule { }
