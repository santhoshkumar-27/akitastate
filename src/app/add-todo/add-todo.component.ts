import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoServices } from '../shared/todo.service';
import { TodoStore } from '../state/state';
import { TodoQuery } from '../state/todo.query';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todoForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private todoStore: TodoStore,
    private todoQuery: TodoQuery,
    private todoService: TodoServices,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.todoForm = this.fb.group({
      title : ['', [Validators.required]],
      description : ['', [Validators.required]]
    }) 
  }
  addTodo() {
    this.todoStore.setLoading(true)
    this.todoService
    .addTodo(this.todoForm.controls['title'].value, this.todoForm.controls['description'].value)
    .subscribe({
      next: (res) => {
        this.todoStore.update( state => {
          return {
            todos: [
              ...state.todos,
              res
            ]
          }
        })
      }, 
      error: (err) => {
        console.log('error log', err);
      }
    })
    this.todoStore.setLoading(false);
    this.router.navigateByUrl('');
  }
}
