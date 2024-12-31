import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component'; // Import the ToastComponent
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import Font Awesome
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastComponent, FontAwesomeModule], // Include FontAwesomeModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo';
  tasks: any[] = [];
  newtask = '';
  APIURL = 'http://localhost:5041/';

  @ViewChild('toast') toast!: ToastComponent; // Access the ToastComponent

  constructor(private http: HttpClient, private library: FaIconLibrary) {
    this.library.addIcons(faPlus, faTrash); // Add specific icons to the library
  }

  ngOnInit() {
    this.get_tasks();
  }

  get_tasks() {
    this.http.get(this.APIURL + 'get_tasks').subscribe(
      (res: any) => {
        this.tasks = res;
      },
      (error) => {
        this.toast.showToast('Failed to fetch tasks!', 'error'); // Show error toast
      }
    );
  }

  add_task() {
    let body = new FormData();
    body.append('task', this.newtask);
    this.http.post(this.APIURL + 'add_task', body).subscribe(
      (res) => {
        this.toast.showToast('Task added successfully!', 'success'); // Show success toast
        this.newtask = '';
        this.get_tasks();
      },
      (error) => {
        this.toast.showToast('Failed to add task!', 'error'); // Show error toast
      }
    );
  }

  delete_task(id: any) {
    let body = new FormData();
    body.append('id', id);
    this.http.post(this.APIURL + 'delete_task', body).subscribe(
      (res) => {
        this.toast.showToast('Task deleted successfully!', 'success'); // Show success toast
        this.get_tasks();
      },
      (error) => {
        this.toast.showToast('Failed to delete task!', 'error'); // Show error toast
      }
    );
  }
}
