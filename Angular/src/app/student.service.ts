import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addStudent(newStudent: { name: string; score: number; }) {
    throw new Error('Method not implemented.');
  }
  getStudents() {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
